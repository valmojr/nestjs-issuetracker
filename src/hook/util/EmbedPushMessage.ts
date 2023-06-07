import { EmbedBuilder } from 'discord.js';
import { Commit } from './types';

export default async (pusher_discordId: string, commits: Commit[]) =>
  new EmbedBuilder()
    .setTitle(
      `<@${pusher_discordId}> pushed ` + (commits.length > 1)
        ? `${commits.length} commits`
        : `${commits.length} commit`,
    )
    .setDescription(
      `${commits.map((commit) => `${commit.hash} ${commit.message}\n`)}`,
    )
    .setColor('#00ff00')
    .setURL(
      `https://${process.env.GITEA_URL}/${process.env.GITEA_REPO_OWNER}/${process.env.GITEA_REPO_NAME}/commits/main`,
    );
