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
