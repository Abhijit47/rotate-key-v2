export interface EmailData {
  app: {
    domain_name: string | null; // 'superb.bluegill-93.lcl.dev';
    logo_image_url: string | null; // '';
    logo_url: string | null;
    name: string | null; // 'next-property';
    url: string | null; // 'https://superb-bluegill-93.accounts.dev';
  };
  browser_name: string | null; // 'Chrome';
  device_type: string | null; // 'Windows';
  ip_address: string | null; // '103.217.231.233';
  location: string | null; //'Bālurghāt, IN';
  operating_system: string | null; // 'Windows';
  revoke_session_url: string | null; // '';
  session_created_at: string | null; // 'August 31, 02:18PM +0000';
  sign_in_method: string | null; // 'Password';
  support_email: string | null; //'';
  theme: {
    button_text_color: string | null; //  '#ffffff';
    primary_color: string | null; // '#6c47ff';
    show_clerk_branding: boolean | null; // true;
  };
}
