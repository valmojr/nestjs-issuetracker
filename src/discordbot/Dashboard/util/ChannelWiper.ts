import { DMChannel } from 'discord.js';

export default async (channel: any) => {
  let interaction_size = 100;
  while (interaction_size == 100) {
    await channel
      .bulkDelete(100)
      .then((messages) => (interaction_size = messages.size))
      .catch(console.error);
  }
};

export const wipePrivateChannel = async (dmChannel: DMChannel) => {
  try {
    const messages = await dmChannel.messages.fetch({ limit: 100 });
    messages.each((message) => message.delete());
  } catch (error) {
    console.error('Error deleting messages in DM channel:', error);
  }
};
