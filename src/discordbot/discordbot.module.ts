import { Module } from '@nestjs/common';
import { DiscordBotService } from './discordbot.service';
import { UserService } from 'src/user/user.service';
import { DatabaseService } from 'src/database/database.service';
import { NecordModule } from 'necord';
import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import { DiscordBotConfigService } from './DiscordBotConfig.service';
import { IssueService } from './Issue/issue.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    NecordModule.forRootAsync({
      useClass: DiscordBotConfigService,
    }),
  ],
  providers: [
    UserService,
    DiscordBotConfigService,
    DiscordBotService,
    DatabaseService,
    IssueService,
  ],
})
export class DiscordbotModule {}
