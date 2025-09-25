import { CardContent } from '@/components/ui/card';
import { uploadedDocuments } from '@/constants';
import { LazyPDFCard } from '.';

export default async function UploadedDocuments() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <CardContent>
      <section
        className={'container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4'}>
        {uploadedDocuments.map((doc) => (
          <LazyPDFCard key={doc.id} doc={doc} />
        ))}
      </section>
    </CardContent>
  );
}
