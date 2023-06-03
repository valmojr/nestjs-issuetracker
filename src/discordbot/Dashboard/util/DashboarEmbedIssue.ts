import { EmbedBuilder } from 'discord.js';
import { Issue } from 'src/discordbot/Issue/issueTypes';
import { parseBody } from './BodyParser';
import ColorPicker from './ColorPicker';
import { User } from '@prisma/client';
import ConvertTime from './ConvertTime';

export default async (issue: Issue, users: User[]) => {
  const tasks = parseBody(issue.body);

  const status = tasks.filter((task) => task.isComplete).length / tasks.length;

  const statusLabel = issue.labels
    .find((label) => label.name.includes('Status/'))
    .name.split('/')[1];

  const typeLabel = issue.labels
    .find((label) => label.name.includes('Tipo/'))
    .name.split('/')[1];

  const assignees = issue.assignees.map((assignee) => {
    const user = users.find((user) => user.username == assignee.username);
    return user.discordId ? `<@${user.discordId}>` : user.username;
  });

  const description =
    status > 0 && status < 100
      ? `Ainda faltam ${tasks
          .filter((task) => !task.isComplete)
          .map((task) => task.name)
          .join(', ')}`
      : null;

  const embed = new EmbedBuilder()
    .setTitle(issue.title)
    .setDescription(description)
    .setColor(ColorPicker(tasks));

  if (issue.milestone != null) {
    const time = ConvertTime(issue.milestone.due_on);

    embed.addFields({
      name: 'Tempo restante',
      value: `${time.daysRemaining} dias`,
      inline: true,
    });

    embed.addFields({
      name: 'Prazo',
      value: time.formattedDateTime,
      inline: true,
    });
  }

  embed.addFields({
    name: 'Tipo',
    value: typeLabel,
  });

  embed.addFields({
    name: 'Assignees',
    value: assignees.join(', '),
  });

  if (issue.labels.find((label) => label.name.includes('Status/'))) {
    embed.addFields({
      name: 'Status',
      value: statusLabel,
      inline: true,
    });

    embed.addFields({
      name: 'Status',
      value: `${Math.floor(status * 100)}%`,
      inline: true,
    });
  } else {
    embed.addFields({
      name: 'Status',
      value: `${Math.floor(status * 100)}%`,
      inline: true,
    });
  }

  return embed;
};
