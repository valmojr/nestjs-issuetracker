import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssueModule } from './issue/issue.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [IssueModule, TeamModule, UserModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
