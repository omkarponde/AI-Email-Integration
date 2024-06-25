import dotenv from 'dotenv';
dotenv.config();

interface GoogleConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

interface OutlookConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

interface RedisConfig {
  host: string;
  port: number;
  password?: string;
}

interface AppConfig {
  google: GoogleConfig;
  outlook: OutlookConfig;
  redis: RedisConfig;
}

const getRedisConfig = (): RedisConfig => {
  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  };
};

const getConfig = (): AppConfig => {
  const googleConfig: GoogleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    redirectUri: process.env.GOOGLE_REDIRECT_URI || '',
  };

  const outlookConfig: OutlookConfig = {
    clientId: process.env.OUTLOOK_CLIENT_ID || '',
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET || '',
    redirectUri: process.env.OUTLOOK_REDIRECT_URI || '',
  };

  // Throw an error if any environment variable is missing
  if (!googleConfig.clientId || !googleConfig.clientSecret || !googleConfig.redirectUri) {
    throw new Error('Missing Google OAuth environment variables');
  }

  if (!outlookConfig.clientId || !outlookConfig.clientSecret || !outlookConfig.redirectUri) {
    throw new Error('Missing Outlook OAuth environment variables');
  }

  return {
    google: googleConfig,
    outlook: outlookConfig,
    redis: getRedisConfig(),
  };
};

export const config = getConfig();
