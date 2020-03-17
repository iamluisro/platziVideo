import dotenv from 'dotenv';

dotenv.config();

const { ENV, PORT } = process.env;

export default {
  env: ENV,
  port: PORT,
};
