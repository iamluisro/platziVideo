import dotenv from 'dotenv';

dotenv.config();

const { ENV, PORT, API_URL, API_KEY_TOKEN, SESSION_SECRET } = process.env;

export default {
  env: ENV,
  port: PORT,
  apiUrl: API_URL,
  apiKeyToken: API_KEY_TOKEN,
  sessionSecret: SESSION_SECRET,
};
