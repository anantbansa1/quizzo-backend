import bcrypt from "bcrypt";

export const getBcryptHash = async (hash: string, saltOrRounds = 10) => {
  return await bcrypt.hash(hash, saltOrRounds);
};

export const compareBcryptHash = async (text: string, hash: string) => {
  return await bcrypt.compare(text, hash);
};
