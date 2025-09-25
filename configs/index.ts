const isDev = process.env.NODE_ENV === 'development' ? true : false;

const config = {
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
  databaseUrl: process.env.DATABASE_URL,
  clerk: {
    secretKey: process.env.CLERK_SECRET_KEY,
    webhookSecretKey: isDev
      ? process.env.CLERK_DEV_WEBHOOK_KEY
      : process.env.CLERK_PROD_WEBHOOK_KEY,
  },
  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  google: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  sendgrid: {
    secretKey: process.env.SENDGRID_SECRET_KEY,
  },
  knock: {
    apiKey: process.env.NEXT_PUBLIC_KNOCK_API_KEY,
    inAppfeedChannelId: process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID,
    secretKey: process.env.KNOCK_API_SECRET_KEY,
  },
  razorpay: {
    apiKey: isDev
      ? process.env.RAZORPAY_DEV_API_KEY
      : process.env.RAZORPAY_PROD_API_KEY,
    secretKey: isDev
      ? process.env.RAZORPAY_DEV_API_SECRET
      : process.env.RAZORPAY_PROD_API_SECRET,
    webhookSecret: isDev
      ? process.env.RAZORPAY_DEV_WEBHOOK_SECRET
      : process.env.RAZORPAY_PROD_WEBHOOK_SECRET,
  },
  calendly: {
    clientId: process.env.CALENDLY_CLIENT_ID,
    clientSecret: process.env.CALENDLY_CLIENT_SECRET,
    accessToken: process.env.CALENDLY_ACCESS_TOKEN,
    webhookSigningKey: process.env.CALENDLY_WEBHOOK_SIGNING_KEY,
  },
};

export default config;
