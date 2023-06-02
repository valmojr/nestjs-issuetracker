import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DiscordbotModule } from './discordbot/discordbot.module';

@Module({
  imports: [UserModule, DiscordbotModule],
  providers: [AppService],
})
export class AppModule {}
