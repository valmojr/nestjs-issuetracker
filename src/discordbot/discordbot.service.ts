import { Injectable, Logger } from '@nestjs/common';
import { Once, Context, ContextOf, On } from 'necord';
import * as dotenv from 'dotenv';
import { Scheduler } from './util/Scheduler';
import { UserService } from 'src/user/user.service';
import { DashboardService } from './Dashboard/Dashboard.service';

@Injectable()
export class DiscordBotService {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly userService: UserService,
  ) {
    dotenv.config();
  }
  private readonly logger = new Logger(DiscordBotService.name);

  @Once('ready')
  public async onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);

    new Scheduler(process.env.DISCORD_DASHBOARD_INTERVAL, async () => {
      const users = await this.userService.fetchUsersFromOrg();

      users.forEach(async (user) => {
        if (!user.discordId) {
          this.logger.error(
            `${user.username} has no discord id, cant link them to a discord user`,
          );
        } else {
          users.forEach(async (orgUser) => {
            if (orgUser.id == user.id) {
              orgUser.discordId = user.discordId;
            }
          });
        }
      });

      this.dashboardService.updater(client, users);
    });

    new Scheduler(process.env.DISCORD_DASHBOARD_DIRECT_INTERVAL, async () => {
      const users = await this.userService.fetchUsersFromOrg();

      users.forEach(async (user) => {
        if (!user.discordId) {
          this.logger.error(
            `${user.username} has no discord id, cant link him to a discord user`,
          );
        } else {
          users.forEach(async (orgUser) => {
            if (orgUser.id == user.id) {
              orgUser.discordId = user.discordId;
            }
          });
        }
      });

      this.dashboardService.spammer(client, users);
    });
  }

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }
}
