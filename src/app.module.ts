import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DiscordbotModule } from './discordbot/discordbot.module';
import { HookModule } from './hook/hook.module';

@Module({
  imports: [UserModule, DiscordbotModule, HookModule],
  providers: [AppService],
})
export class AppModule {}
