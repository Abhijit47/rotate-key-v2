import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Link } from '@/i18n/navigation';
// import * as pdfjs from 'pdfjs-dist';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistance } from 'date-fns';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
// import docUrl from '@/public/Land-Deed.pdf';

// import { GlobalWorkerOptions } from 'pdfjs-dist';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   // 'pdfjs-dist/build/pdf.worker.min.mjs',
//   // import.meta.url
//   // `node_modules/pdfjs-dist/build/pdf.worker.min.mjs`,
//   '../../../../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url
// ).href;

console.log('PDFJS Version:', pdfjs.version);
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker-5.3.31.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = `./pdf.worker-5.3.93.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc =
//   '//unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.js';
// pdfjs.GlobalWorkerOptions.workerSrc =
//   'https://unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.js';
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type UploadedDocuments = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: string;
  docLink: string;
};

export default function PDFCard({ doc }: { doc: UploadedDocuments }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setLoading(true);
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  }

  function goToPrevPage() {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  }

  function goToNextPage() {
    if (pageNumber < (numPages ?? 1)) setPageNumber((prev) => prev + 1);
  }

  return (
    <Card className='py-4 gap-4'>
      <CardHeader>
        <CardTitle>{doc.name}</CardTitle>
      </CardHeader>

      <CardContent className={'space-y-2'}>
        <Badge variant='outline'>Type: {doc.type}</Badge>{' '}
        <Badge variant='outline'>Size: {doc.size}</Badge>{' '}
        <Badge variant='outline'>
          Uploaded At:{' '}
          {formatDistance(doc.uploadedAt, new Date(), { addSuffix: true })}
        </Badge>
      </CardContent>

      <CardContent>
        {loading ? (
          <Skeleton className='w-full h-[400px] animate-pulse transition-all duration-300 ease-in-out' />
        ) : (
          <Document
            noData={<Badge variant='outline'>No Document Loaded</Badge>}
            externalLinkRel='noopener noreferrer'
            externalLinkTarget='_blank'
            // file={doc.docLink}
            file={'/Land-Deed.pdf'}
            loading={<Skeleton className='w-full h-[400px] animate-pulse' />}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(err) => {
              console.error('PDF Load Error:', err);
              setLoading(true);
            }}
            onLoadedData={() => setLoading(false)}
            onLoadProgress={({ loaded, total }) => {
              // console.log(`Loading PDF: ${loaded} of ${total} bytes`);
              setProgress(Math.round((loaded / total) * 100));
            }}
            onSourceError={(err) => {
              console.error('PDF Source Error:', err);
              setError('Failed to load PDF document.');
              toast.error('Failed to load PDF document.');
            }}
            onError={(err) => {
              console.error('PDF Error:', err);
              setError('Failed to load PDF document.');
              toast.error('Failed to load PDF document.');
            }}
            error={error ? <Badge variant='destructive'>{error}</Badge> : null}
            className='w-full h-full'>
            {loading ? (
              <Skeleton className='w-full h-[400px] animate-pulse transition-all duration-300 ease-in-out' />
            ) : (
              <Page
                noData={<Badge variant='outline'>No Page Loaded</Badge>}
                canvasBackground='transparent'
                devicePixelRatio={window.devicePixelRatio}
                pageNumber={pageNumber}
                width={300}
                height={400}
                error={<Badge variant='destructive'>Failed to load page</Badge>}
                loading={
                  <Skeleton className='w-full h-[400px] animate-pulse' />
                }
                renderAnnotationLayer={false}
                renderTextLayer={true}
                className='w-full h-full'
                onLoadStart={() => setLoading(true)}
                onLoadSuccess={() => setLoading(false)}
                onLoadedData={() => setLoading(false)}
              />
            )}
          </Document>
        )}
      </CardContent>

      {numPages && (
        <CardContent className={'transition-all duration-150 ease-in-out'}>
          <div className='flex items-center justify-between'>
            <Button
              onClick={goToPrevPage}
              disabled={pageNumber === 1}
              // className='text-blue-500 disabled:opacity-30'
              className={buttonVariants({
                variant: 'secondary',
                // className: 'text-blue-500 disabled:opacity-30',
              })}>
              Previous
            </Button>
            <Badge variant='outline'>
              Page {pageNumber} of {numPages}
            </Badge>
            <Button
              onClick={goToNextPage}
              disabled={pageNumber === numPages}
              className={buttonVariants({
                variant: 'secondary',
                // className: 'text-blue-500 disabled:opacity-30',
              })}>
              Next
            </Button>
          </div>
        </CardContent>
      )}

      <CardContent className={'space-y-1'}>
        <div className={'text-xs flex items-center justify-between'}>
          <Badge>{0}</Badge>
          Loading Progress...
          <Badge>{progress}</Badge>
        </div>
        <Progress value={progress} className='w-full' />
      </CardContent>

      <CardAction className='w-full'>
        <Link
          href={doc.docLink}
          target='_blank'
          rel='noopener noreferrer'
          locale={locale}
          className={buttonVariants({
            variant: 'link',
            className: 'w-full text-center',
            size: 'sm',
          })}>
          View Document
          <span>
            <SquareArrowOutUpRight className='inline-block size-3' />
          </span>
        </Link>
      </CardAction>
    </Card>
  );
}
