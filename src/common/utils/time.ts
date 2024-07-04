export const toTimestamp = (timestamp: number) => {
  return new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');
};
