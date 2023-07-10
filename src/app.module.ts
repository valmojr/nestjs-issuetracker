import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssueModule } from './issue/issue.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [IssueModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
