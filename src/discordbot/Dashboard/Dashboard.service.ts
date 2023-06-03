import { Injectable, Logger } from '@nestjs/common';
import { Client, TextChannel } from 'discord.js';
import ChannelWiper from './util/ChannelWiper';
import { IssueService } from '../Issue/issue.service';
import { User } from '@prisma/client';
import DashboarEmbedIssue from './util/DashboarEmbedIssue';

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
}
