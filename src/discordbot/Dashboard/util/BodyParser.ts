export interface Task {
  id: number;
  name: string;
  isComplete: boolean;
}

export const parseBody = (body: string): Task[] => {
  const lines: string[] = body.split('\n');
  const tasks: Task[] = [];
  let taskId = 1;

  for (const line of lines) {
    const trimmedLine: string = line.trim();
    if (trimmedLine.startsWith('- [ ]')) {
      const taskName: string = trimmedLine.split('] ')[1];
      tasks.push({
        id: taskId,
        name: taskName,
        isComplete: false,
      });
      taskId++;
    } else if (trimmedLine.startsWith('- [x]')) {
      const taskName: string = trimmedLine.split('] ')[1];
      tasks.push({
        id: taskId,
        name: taskName,
        isComplete: true,
      });
      taskId++;
    }
  }

  return tasks;
};

export const generateBody = (tasks: Task[]): string => {
  let body = '';

  for (const task of tasks) {
    const taskStatus: string = task.isComplete ? '- [x]' : '- [ ]';
    body += `${taskStatus} ${task.name}\n`;
  }

  return body.trim();
};
