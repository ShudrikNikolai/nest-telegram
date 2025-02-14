export const DecodeDeepLink = (str: string): string => {
  // [1] - phone
  // [2] - email
  return Buffer.from(str, 'base64').toString('ascii');
};
