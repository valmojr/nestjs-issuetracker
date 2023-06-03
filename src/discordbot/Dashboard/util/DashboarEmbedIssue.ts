import { EmbedBuilder } from 'discord.js';
import { Issue } from 'src/discordbot/Issue/issueTypes';
import { parseBody } from './BodyParser';
import ColorPicker from './ColorPicker';
import { User } from '@prisma/client';
import ConvertTime from './ConvertTime';

export default async (issue: Issue, users: User[]) => {
  const tasks = parseBody(issue.body);

  console.log(tasks);

  const status = tasks.filter((task) => task.isComplete).length / tasks.length;

  const assignees = issue.assignees.map((assignee) => {
    const user = users.find((user) => user.username == assignee.username);
    return user.discordId ? `<@${user.discordId}>` : user.username;
  });

  const description =
    status > 0 && status < 100
      ? `Ainda falta ${tasks
          .filter((task) => !task.isComplete)
          .map((task) => task.name)
          .join(', ')}`
      : null;

  const embed = new EmbedBuilder()
    .setTitle(issue.title)
    .setDescription(description)
    .addFields({
      name: 'Status',
      value: `${Math.floor(status * 100)}%`,
    })
    .setColor(ColorPicker(tasks))
    .addFields({
      name: 'Assignees',
      value: assignees.join(', '),
    });

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

  return embed;
};
