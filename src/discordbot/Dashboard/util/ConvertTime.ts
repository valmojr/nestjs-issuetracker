export default (
  timestamp: string,
): { formattedDateTime: string; daysRemaining: number } => {
  const date = new Date(timestamp);
  const formattedDateTime = date.toLocaleDateString('pt-BR');

  // Calculate remaining days
  const now = new Date();
  const timeDifference = date.getTime() - now.getTime();
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return {
    formattedDateTime,
    daysRemaining,
  };
};
