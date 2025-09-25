import { v2 as cloudinary } from 'cloudinary';
import config from './index';

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary.cloudName, // Click 'View API Keys' above to copy your cloud name
  api_key: config.cloudinary.apiKey, // Click 'View API Keys' above to copy your API key
  api_secret: config.cloudinary.apiSecret, // Click 'View API Keys' above to copy your API secret
  secure: true,
});

// Export
export default cloudinary;
