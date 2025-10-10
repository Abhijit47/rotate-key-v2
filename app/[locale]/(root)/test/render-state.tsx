import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CloudUploadIcon, ImageOff, X } from 'lucide-react';
import Image from 'next/image';

interface RenderEmptyStateProps {
  isDragActive: boolean;
}

export function RenderEmptyState(props: RenderEmptyStateProps) {
  const { isDragActive } = props;

  return (
    <div className={'text-center'}>
      <div
        className={
          'flex items-center justify-center size-12 mx-auto rounded-full bg-muted mb-4'
        }>
        <CloudUploadIcon
          className={cn(
            'size-6 text-muted-foreground',
            isDragActive && 'text-primary'
          )}
        />
      </div>

      <p className={'text-base font-semibold text-foreground'}>
        Drop the files here{' '}
        <span className={'text-primary font-bold cursor-pointer'}>
          Click to upload
        </span>
      </p>

      <Button type='button' className={'mt-4'}>
        Select file
      </Button>
    </div>
  );
}

export function RenderErrorState() {
  return (
    <div className={'text-center text-destructive'}>
      <div
        className={
          'flex items-center justify-center size-12 mx-auto rounded-full bg-destructive/75 mb-4'
        }>
        <ImageOff className={cn('size-6 text-destructive-foreground')} />
      </div>

      <p className={'text-sm font-semibold text-muted-foreground'}>
        An error occurred while uploading the file.
      </p>
      <Button type='button' variant={'destructive'} className={'mt-4'}>
        Try Again
      </Button>
    </div>
  );
}

interface RenderUploadedStateProps {
  previewUrl: string;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  fileType: 'image' | 'video';
}

export function RenderUploadedState(props: RenderUploadedStateProps) {
  const { previewUrl } = props;
  console.log('Preview URL:', previewUrl);

  return (
    <div
      className={
        'relative group w-full h-full flex items-center justify-center'
      }>
      {props.fileType === 'video' ? (
        <video
          controls
          width='100%'
          height={'100%'}
          className={'rounded-lg w-full h-full'}>
          <source src={previewUrl} type='video/mp4' />
        </video>
      ) : (
        <Image
          src={previewUrl}
          alt='uploaded file'
          fill
          sizes='(max-width: 640px) 100vw, 640px'
          className={'object-contain p-2'}
        />
      )}

      <Button
        onClick={props.onDelete}
        disabled={props.isDeleting}
        type='button'
        variant={'destructive'}
        size={'icon'}
        className={cn(
          'absolute -top-2 right-4 z-10 bg-muted hover:bg-muted/80 transition-colors'
        )}>
        <X className={'size-4 text-destructive-foreground'} />
        <span className={'sr-only'}>Remove file</span>
      </Button>
    </div>
  );
}

interface RenderUploadingStateProps {
  progress: number;
  file: File | null;
}

export function RenderUploadingState(props: RenderUploadingStateProps) {
  const { progress, file } = props;

  return (
    <div
      className={'text-center flex items-center justify-center flex-col gap-2'}>
      <p>{progress}</p>
      <Progress
        value={progress}
        className={cn(
          'bg-muted transition-all duration-300 ease-in-out',
          `w-${progress}% h-2 rounded-full overflow-hidden`
        )}
      />
      <p className={'text-sm font-medium text-foreground truncate max-w-xs'}>
        Uploading {file?.name}...
      </p>
    </div>
  );
}
