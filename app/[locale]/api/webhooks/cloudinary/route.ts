import cloudinary from '@/configs/cloudinary';
import {
  AccessMode,
  DeliveryType,
  ImageFormat,
  ResourceType,
} from 'cloudinary';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('Cloudinary Webhook received');
    const headersList = await headers();
    const timestamp = headersList.get('x-cld-timestamp');
    const signature = headersList.get('x-cld-signature');
    if (!timestamp || !signature) {
      return NextResponse.json(
        { success: false, message: 'Missing required headers' },
        { status: 400 }
      );
    }

    const payload: WebhookPayload = await req.json();

    const validFor = 3600; // 1 hour
    const verify = cloudinary.utils.verifyNotificationSignature(
      JSON.stringify(payload),
      parseInt(timestamp),
      signature,
      validFor
    );
    console.log('Signature valid:', verify);

    // TODO: Process the webhook payload as needed

    return NextResponse.json(
      { success: true, message: 'Webhook received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
}

type WebhookPayload = UploadWebHookPayload | DeleteWebHookPayload;

type NotificationType = 'upload' | 'delete';
type TriggerSource = 'api' | 'ui';

type UploadWebHookPayload = {
  notification_type: NotificationType;
  timestamp: string;
  request_id: string;
  asset_id: string;
  public_id: 'rotate-key/my-property/20241223_152356.jpg';
  version: number;
  version_id: string;
  width: number;
  height: number;
  format: ImageFormat;
  resource_type: ResourceType;
  created_at: string;
  tags: string[];
  bytes: number;
  type: 'upload';
  etag: string;
  placeholder: false;
  url: string;
  secure_url: 'https://res.cloudinary.com/rotate-key/image/upload/v1759127846/rotate-key/my-property/20241223_152356.jpg.jpg';
  asset_folder: 'rotate-key';
  display_name: 'file';
  access_mode: AccessMode;
  original_filename: 'file';
  api_key: string;
  notification_context: {
    triggered_at: string;
    triggered_by: { source: TriggerSource; id: string };
  };
  signature_key: string;
};

type DeleteWebHookPayload = {
  notification_type: NotificationType;
  resources: {
    resource_type: ResourceType;
    type: DeliveryType;
    asset_id: string;
    public_id: string;
    version: number;
    asset_folder: 'rotate-key' | (string & {});
    display_name: 'file' | (string & {});
  }[];
  notification_context: {
    triggered_at: string;
    triggered_by: { source: TriggerSource; id: string };
  };
  signature_key: '773119789645682';
};
