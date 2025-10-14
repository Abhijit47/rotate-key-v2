import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ConfidentialInformationForm from './confidential-information-form';

export default function UpdateProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base/7 font-semibold text-foreground'>
          Confidential Information
        </CardTitle>
        <CardDescription>
          <p className='text-muted-foreground'>
            Your telephone number, your email address will be communicated to
            another person (host or guest) only in the case of an exchange. The
            other information will not be disclosed and will remain private.
          </p>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <ConfidentialInformationForm />
      </CardContent>
    </Card>
  );
}
