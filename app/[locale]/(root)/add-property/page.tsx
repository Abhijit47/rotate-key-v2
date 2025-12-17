import SectionWrapper from '@/components/shared/SectionWrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { routing } from '@/i18n/routing';
import { requireAuth } from '@/lib/require-auth';
import { HousePlusIcon } from 'lucide-react';
import { Metadata } from 'next';
import CreatePropertyForm from './_components/CreatePropertyForm';

export const metadata: Metadata = {
  title: {
    default: 'Add Property',
    template: `%s | 'Rotatekey - Smart Real Estate Technology Platform'`,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AddPropertyPage() {
  await requireAuth();

  return (
    <main className={'py-16'}>
      <SectionWrapper className={'space-y-6'}>
        {/* <h1>Pricing page</h1> */}
        <Card className={'max-w-5xl mx-auto w-full'}>
          <CardHeader>
            <CardTitle>
              <h1 className={'text-4xl text-center font-primary'}>
                <span>
                  <HousePlusIcon className='inline-block size-10 stroke-primary-600' />{' '}
                </span>
                Create your own!!!
              </h1>
            </CardTitle>
          </CardHeader>

          <CardDescription>
            <p className={'text-center text-lg'}>
              Listed your property is free. You can create your own property and
              manage it.
            </p>
          </CardDescription>
          <Separator />

          <CardContent>
            <CreatePropertyForm />
          </CardContent>
        </Card>
      </SectionWrapper>
    </main>
  );
}
