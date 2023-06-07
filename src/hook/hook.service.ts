import { Injectable, Logger } from '@nestjs/common';
import EmbedPushMessage from './util/EmbedPushMessage';
import { Commit } from './util/types';

@Injectable()
export class HookService {
  private logger = new Logger(HookService.name);

  async mikeroThrowError(
    pusher_username: string,
    commit_message: string,
    error: any,
  ) {
    this.logger.error(error);
  }

  async pushOnMainBranch(pusher_username: string, commits: Commit[]) {
    return await fetch(process.env.GITHOOK_CHANNEL_ID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: process.env.MAIN_BRANCH_USERNAME,
        avatar_url: process.env.MAIN_BRANCH_AVATAR_URL,
        embeds: [EmbedPushMessage(pusher_username, commits)],
      }),
    });
  }

  async pushOnDevBranch(pusher_username: string, commits: Commit[]) {
    return await fetch(process.env.GITHOOK_CHANNEL_ID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: process.env.DEV_BRANCH_USERNAME,
        avatar_url: process.env.DEV_BRANCH_AVATAR_URL,
        embeds: [EmbedPushMessage(pusher_username, commits)],
      }),
    });
  }
}
