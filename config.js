require('dotenv').config()
const env = process.env;
export const nodeEnv = env.NODE_ENV || 'development'
export default {
  mongodbUri: env.MONGODB_URI,
  port: env.PORT || 3000,
  host: env.HOST || '0.0.0.0',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};
