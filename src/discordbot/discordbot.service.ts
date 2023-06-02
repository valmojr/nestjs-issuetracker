import { Injectable, Logger } from '@nestjs/common';
import { Once, Context, ContextOf, On } from 'necord';
import * as dotenv from 'dotenv';
import { Scheduler } from './util/Scheduler';
import { IssueService } from './Issue/issue.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DiscordBotService {
  constructor(
    private readonly issueService: IssueService,
    private readonly userService: UserService,
  ) {
    dotenv.config();
  }
  private readonly logger = new Logger(DiscordBotService.name);

  @Once('ready')
  public async onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);

    new Scheduler('* * * * * *', async () => {
      const users = await this.userService.fetchUsersFromOrg();
      users.forEach(async (user) => {
        this.logger.log(user);
      });
    });
  }

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }
}
