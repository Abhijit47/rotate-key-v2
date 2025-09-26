import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Suspense } from 'react';
import RevalidateData from '../_components/revalidate-data';
import UploadDocumentsLoader from './_components/upload-documents-loader';
import UploadedDocuments from './_components/uploaded-documents-card';

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function DocumentsPage() {
  return (
    <div className={'px-8 space-y-6'}>
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            Manage your documents here. Here you can check the uploaded
            documents, and take suitable actions against them.
          </CardDescription>

          <RevalidateData tagName='documents' type='page' />
        </CardHeader>

        <Suspense fallback={<UploadDocumentsLoader />}>
          <UploadedDocuments />
        </Suspense>
      </Card>
    </div>
  );
}
