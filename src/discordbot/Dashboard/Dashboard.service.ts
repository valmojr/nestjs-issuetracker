import { Injectable, Logger } from '@nestjs/common';
import {
  ActionRowBuilder,
  ButtonBuilder,
  Client,
  TextChannel,
} from 'discord.js';
import ChannelWiper, { wipePrivateChannel } from './util/ChannelWiper';
import { IssueService } from '../Issue/issue.service';
import { User } from '@prisma/client';
import DashboardEmbedIssue from './util/DashboarEmbedIssue';
import IntelButton from './util/Intel.button';
import { Issue } from '../Issue/issueTypes';

function sortIssuesByLabel(issues: Issue[], targetLabel: string): Issue[] {
  const issuesWithoutLabel = issues.filter(
    (issue) => !issue.labels.some((label) => label.name === targetLabel),
  );

  const issuesWithLabel = issues.filter((issue) =>
    issue.labels.some((label) => label.name !== targetLabel),
  );

  return issuesWithoutLabel.concat(issuesWithLabel);
}

@Injectable()
export class DashboardService {
  constructor(private readonly issueService: IssueService) {}
  private logger = new Logger(DashboardService.name);

  async updater(client: Client, users: User[]) {
    const dashboardChannel = (await client.channels.fetch(
      process.env.DISCORD_DEV_DASHBOARD_CHANNEL_ID,
    )) as TextChannel;

    await ChannelWiper(dashboardChannel);

    const onExecIssues = await this.issueService.getOnExecIssues();
    //const improvementIssues = await this.issueService.getImprovementIssues();

    const showedIssues = [...onExecIssues];

    showedIssues.forEach(async (issue) => {
      dashboardChannel.send({
        embeds: [await DashboardEmbedIssue(issue, users)],
      });
    });

    this.logger.log('Dashboard updated');
  }

  async spammer(client: Client, users: User[]) {
    users.forEach(async (user) => {
      const privateChannel = await client.users.fetch(user.discordId);

      await privateChannel.createDM();

      try {
        await wipePrivateChannel(await privateChannel.createDM());
      } catch (error) {
        this.logger.error(`Failed to wipe ${user.username}'s DMs`);
      }

      const userIssues = await this.issueService.getIssuesByAssignedUser(
        user.username,
      );

      const sortedIssues = sortIssuesByLabel(userIssues, 'on-exec');

      await privateChannel.deleteDM();
      sortedIssues.forEach(async (issue) => {
        try {
          await privateChannel.send({
            embeds: [await DashboardEmbedIssue(issue, users)],
            components: [
              new ActionRowBuilder<ButtonBuilder>().addComponents(
                IntelButton(issue.id),
              ),
            ],
          });
          this.logger.log(`Sending issue ${issue.title} to ${user.username}`);
        } catch (error) {
          await privateChannel.send({
            content: `Erro ao enviar issue ${issue.title} para ${user.username}, será que o servidor está online?`,
          });
          this.logger.error(
            `error sending issue ${issue.title} to ${user.username}`,
          );
        }
      });
    });
  }
}
