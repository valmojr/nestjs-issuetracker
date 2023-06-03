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
import DashboarEmbedIssue from './util/DashboarEmbedIssue';
import IntelButton from './util/Intel.button';

@Injectable()
export class DashboardService {
  constructor(private readonly issueService: IssueService) {}
  private logger = new Logger(DashboardService.name);

  async updater(client: Client, users: User[]) {
    const dashboardChannel = (await client.channels.fetch(
      process.env.DISCORD_DEV_DASHBOARD_CHANNEL_ID,
    )) as TextChannel;

    await ChannelWiper(dashboardChannel);

    users.forEach(async (user) => {
      const userIssues = await this.issueService.getIssuesByAssignedUser(
        user.username,
      );

      const embeds = await Promise.all(
        userIssues.map(async (issue) => {
          return await DashboarEmbedIssue(issue, users);
        }),
      );

      await dashboardChannel.send({
        content: user.discordId ? `<@${user.discordId}>` : user.username,
        embeds,
      });
    });
    this.logger.log('Dashboard updated');
  }

  async spammer(client: Client, users: User[]) {
    users.forEach(async (user) => {
      const privateChannel = (
        await client.users.fetch(user.discordId)
      ).createDM();

      await wipePrivateChannel(await privateChannel);

      const userIssues = await this.issueService.getIssuesByAssignedUser(
        user.username,
      );

      userIssues.forEach(async (issue) => {
        try {
          await (
            await privateChannel
          ).send({
            embeds: [await DashboarEmbedIssue(issue, users)],
            components: [
              new ActionRowBuilder<ButtonBuilder>().addComponents(
                IntelButton(issue.id),
              ),
            ],
          });
          this.logger.log(`Sending issue ${issue.title} to ${user.username}`);
        } catch (error) {
          this.logger.error(
            `error sending issue ${issue.title} to ${user.username}`,
          );
        }
      });
    });
  }
}
