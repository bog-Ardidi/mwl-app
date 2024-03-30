/**
 * Takes a json and formats it in a pretty state for logging.
 * Used for testing.
 */
export const JsonPrettify = ({ data }: any) => {
  return JSON.stringify(data, null, 2);
};
