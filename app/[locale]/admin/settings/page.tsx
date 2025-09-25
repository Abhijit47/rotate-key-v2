import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className={'px-8 space-y-6'}>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your settings here. You can configure various aspects of the
            application, including user preferences, notifications, and more.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
