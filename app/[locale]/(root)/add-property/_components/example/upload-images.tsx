// 'use client';

// import { Card, CardContent } from '@/components/ui/card';
// import { cn, constructUrl } from '@/lib/utils';
// import { AddPropertyFormValues } from '@/lib/validations/property.schema';
// import { FileDeleteResponse, FileUploadResponse } from '@/lib/zodSchemas';
// import { useCallback, useState } from 'react';
// import {
//   ErrorCode,
//   FileError,
//   FileRejection,
//   useDropzone,
// } from 'react-dropzone';
// import { ControllerRenderProps, useFormContext } from 'react-hook-form';
// import { toast } from 'sonner';
// import {
//   RenderEmptyState,
//   RenderErrorState,
//   RenderUploadedState,
//   RenderUploadingState,
// } from './render-state';

// type FieldType = ControllerRenderProps<AddPropertyFormValues, 'propertyImages'>;

// interface UploaderProps {
//   field: FieldType;
//   fileTypeAccepted: 'image'; // Optional prop to specify accepted file type
// }

// // Extracted error code for file type validation
// // eslint-disable-next-line
// type ErrCode = `${ErrorCode}`;

// type UploaderState = {
//   id: string | null;
//   file: File | null;
//   uploading: boolean;
//   progress: number;
//   key?: string;
//   isDeleting: boolean;
//   error: boolean;
//   objectUrl?: string;
//   fileType: 'image';
// };

// export default function Uploader(props: UploaderProps) {
//   const { field, fileTypeAccepted } = props;
//   const [fileState, setFileState] = useState<UploaderState>({
//     id: null,
//     file: null,
//     uploading: false,
//     progress: 0,
//     key: field.value,
//     isDeleting: false,
//     error: false,
//     objectUrl: field.value ? constructUrl(field.value) : undefined, // Initialize with the current value of the field
//     fileType: fileTypeAccepted,
//   });

//   const { getValues } =
//     useFormContext<Pick<AddPropertyFormValues, 'propertyImages'>>();

//   // Get the current value of the field
//   const currentFile = getValues(`propertyImages`);
//   console.log('Current file:', currentFile);

//   const uploadFile = useCallback(
//     async (file: File) => {
//       setFileState((prevState) => ({
//         ...prevState,
//         uploading: true,
//         progress: 0,
//       }));

//       try {
//         // 1. Get Presigned URL from the server
//         const preSignedUrlResponse = await fetch('/api/s3/upload', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             fileName: file.name,
//             contentType: file.type,
//             fileSize: file.size,
//             isImage: fileTypeAccepted === 'image' ? true : false, // Use the prop to determine if it's an image
//           }),
//         });

//         if (!preSignedUrlResponse.ok) {
//           setFileState((prevState) => ({
//             ...prevState,
//             uploading: false,
//             error: true,
//             progress: 0,
//           }));
//           return toast.error(
//             'Failed to get presigned URL for file upload. Please try again.'
//           );
//         }

//         const { url, key, errors } =
//           (await preSignedUrlResponse.json()) as FileUploadResponse;

//         if (errors) {
//           console.error('Validation errors:', errors);
//           setFileState((prevState) => ({
//             ...prevState,
//             uploading: false,
//             error: true,
//             progress: 0,
//           }));
//           return toast.error(
//             `Validation errors: ${Object.values(errors)
//               .map((error) => error)
//               .join('; ')}`
//           );
//         }

//         /*=================================================================*/
//         // XHR Code for upload Tracking
//         await new Promise<void>((resolve, reject) => {
//           // Initialize a new XMLHttpRequest
//           const xhr = new XMLHttpRequest();

//           // Track the upload progress
//           xhr.upload.onprogress = (event) => {
//             if (event.lengthComputable) {
//               const progress = Math.round((event.loaded / event.total) * 100);
//               setFileState((prevState) => ({
//                 ...prevState,
//                 progress,
//               }));
//             }
//           };

//           //
//           xhr.onload = () => {
//             if (xhr.status === 200 || xhr.status === 204) {
//               // File uploaded successfully
//               setFileState((prevState) => ({
//                 ...prevState,
//                 uploading: false,
//                 progress: 100,
//                 file: file,
//                 key: key, // Store the key for later use
//                 objectUrl: URL.createObjectURL(file),
//               }));
//               field.onChange(key); // Update the form field with the file key
//               toast.success('File uploaded successfully');
//               resolve();
//             } else {
//               setFileState((prevState) => ({
//                 ...prevState,
//                 uploading: false,
//                 error: true,
//                 progress: 0,
//                 file: null,
//                 id: null,
//                 objectUrl: undefined,
//               }));
//               reject(new Error('Failed to upload file.'));
//             }
//           };

//           xhr.onerror = () => {
//             setFileState((prevState) => ({
//               ...prevState,
//               uploading: false,
//               error: true,
//               progress: 0,
//               file: null,
//               id: null,
//               objectUrl: undefined,
//             }));
//             reject(new Error('Network error occurred during file upload.'));
//           };

//           xhr.open('PUT', url);
//           xhr.setRequestHeader('Content-Type', file.type);
//           xhr.send(file);
//         });
//       } catch (error) {
//         console.error('Error uploading file:', error);
//         setFileState((prevState) => ({
//           ...prevState,
//           uploading: false,
//           error: true,
//           progress: 0,
//           file: null,
//           id: null,
//           objectUrl: undefined,
//         }));
//         return toast.error(
//           'An error occurred while uploading the file. Please try again.'
//         );
//       }
//     },
//     [field, fileTypeAccepted]
//   );

//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       // Do something with the files
//       // console.log({ acceptedFiles });

//       if (acceptedFiles.length > 0) {
//         const file = acceptedFiles[0];

//         // Prevent memory leaks by revoking the previous object URL
//         if (fileState.objectUrl && !fileState.objectUrl.startsWith('http')) {
//           // Revoke the previous object URL to free up memory
//           console.log('Revoking previous object URL:', fileState.objectUrl);
//           URL.revokeObjectURL(fileState.objectUrl);
//         }

//         setFileState({
//           ...fileState,
//           id: crypto.randomUUID(), // or any unique identifier you want to use
//           file: file,
//           uploading: true,
//           progress: 0,
//           error: false,
//           isDeleting: false,
//           objectUrl: URL.createObjectURL(file),
//           fileType: fileTypeAccepted === 'image' ? 'image' : 'video',
//         });

//         // Call the upload function with the selected file
//         uploadFile(file);
//       }
//     },
//     [fileState, uploadFile, fileTypeAccepted]
//   );

//   async function handleRemoveFile() {
//     if (fileState.isDeleting || !fileState.objectUrl) {
//       toast.error('File is already being deleted or does not exist.');
//       return;
//     }

//     try {
//       setFileState((prevState) => ({
//         ...prevState,
//         isDeleting: true,
//       }));

//       const response = await fetch('/api/s3/delete', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ key: fileState.key }),
//       });

//       if (!response.ok) {
//         setFileState((prevState) => ({
//           ...prevState,
//           isDeleting: true,
//           error: true,
//         }));
//         if (fileState.objectUrl && !fileState.objectUrl.startsWith('http')) {
//           // Revoke the previous object URL to free up memory
//           console.log('Revoking previous object URL:', fileState.objectUrl);
//           URL.revokeObjectURL(fileState.objectUrl);
//         }
//         toast.error('Failed to remove the file. Please try again.');
//         return;
//       }

//       const data = (await response.json()) as FileDeleteResponse;

//       if (data.errors) {
//         console.error('Error deleting file:', data.errors);
//         setFileState((prevState) => ({
//           ...prevState,
//           isDeleting: false,
//           error: true,
//         }));
//         if (fileState.objectUrl && !fileState.objectUrl.startsWith('http')) {
//           // Revoke the previous object URL to free up memory
//           console.log('Revoking previous object URL:', fileState.objectUrl);
//           URL.revokeObjectURL(fileState.objectUrl);
//         }
//         toast.error(data.errors);
//         return;
//       }

//       setFileState((prevState) => ({
//         ...prevState,
//         isDeleting: false,
//         uploading: false,
//         progress: 0,
//         error: false,
//         file: null,
//         id: null,
//         objectUrl: undefined,
//         fileType: fileTypeAccepted === 'image' ? 'image' : 'video',
//       }));

//       field.onChange(null); // Clear the form field value
//       toast.success('File removed successfully');
//       return;
//     } catch (error) {
//       console.error('Error removing file:', error);
//       setFileState((prevState) => ({
//         ...prevState,
//         isDeleting: false,
//         error: true,
//       }));
//       if (fileState.objectUrl && !fileState.objectUrl.startsWith('http')) {
//         // Revoke the previous object URL to free up memory
//         console.log('Revoking previous object URL:', fileState.objectUrl);
//         URL.revokeObjectURL(fileState.objectUrl);
//       }
//       toast.error('An error occurred while removing the file.');
//       return;
//     }
//   }

//   function rejectedFiles(fileRejection: FileRejection[]) {
//     // Handle rejected files
//     // console.error('Rejected files:', fileRejection);

//     if (fileRejection.length > 0) {
//       // Too many files
//       const tooManyFiles = fileRejection.some((file) =>
//         file.errors.some((error: FileError) => error.code === 'too-many-files')
//       );
//       if (tooManyFiles) {
//         console.error('Too many files selected. Only one file is allowed.');
//         return toast.error(
//           'Too many files selected. Only one file is allowed.'
//         );
//       }
//       // File too large
//       const tooLargeFiles = fileRejection.some((file) =>
//         file.errors.some((error: FileError) => error.code === 'file-too-large')
//       );
//       if (tooLargeFiles) {
//         console.error('File is too large. Maximum size is 5 MB.');
//         return toast.error('File is too large. Maximum size is 5 MB.');
//       }
//       // File invalid type
//       const invalidFileType = fileRejection.some((file) =>
//         file.errors.some(
//           (error: FileError) => error.code === 'file-invalid-type'
//         )
//       );
//       if (invalidFileType) {
//         console.error('Invalid file type. Only images are allowed.');
//         return toast.error('Invalid file type. Only images are allowed.');
//       }
//     } else {
//       // If no files were rejected, we can assume the upload was successful
//       // console.log('File uploaded successfully');
//       // return toast.success('File uploaded successfully');
//     }
//   }

//   function renderContent() {
//     if (fileState.uploading) {
//       return (
//         <RenderUploadingState
//           progress={fileState.progress}
//           file={fileState.file}
//         />
//       );
//     }

//     if (fileState.error) {
//       return <RenderErrorState />;
//     }

//     if (fileState.objectUrl) {
//       return (
//         <RenderUploadedState
//           previewUrl={fileState.objectUrl}
//           isDeleting={fileState.isDeleting}
//           onDelete={handleRemoveFile}
//           fileType='image'
//         />
//       );
//     }

//     return <RenderEmptyState isDragActive={isDragActive} />;
//   }

//   // This will required if above useCallback was not implemented *uploadFile
//   // useEffect(() => {
//   //   // Cleanup function to revoke the object URL when the component unmounts
//   //   if (fileState.objectUrl && !fileState.objectUrl.startsWith('http')) {
//   //     // Revoke the previous object URL to free up memory
//   //     console.log('Revoking previous object URL:', fileState.objectUrl);
//   //     URL.revokeObjectURL(fileState.objectUrl);
//   //   }
//   // }, [fileState.objectUrl]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept:
//       fileTypeAccepted === 'image' ? { 'image/*': [] } : { 'video/*': [] },
//     maxFiles: 1,
//     multiple: false,
//     maxSize:
//       fileTypeAccepted === 'image' ? 5 * 1024 * 1024 : 5000 * 1024 * 1024, // 5 MB,
//     // onDropAccepted: (files) => {
//     //   // Update the field value with the accepted file
//     //   field.onChange(files[0]);
//     // },
//     disabled:
//       fileState.uploading || fileState.isDeleting || !!fileState.objectUrl,
//     onDropRejected: (files) => rejectedFiles(files),
//   });

//   return (
//     <Card
//       {...getRootProps()}
//       className={cn(
//         'relative border-2 border-dashed transition-colors w-full h-64',
//         isDragActive
//           ? 'border-primary/10 bg-primary/10 border-solid'
//           : 'border-border hover:border-primary'
//       )}>
//       <CardContent
//         className={
//           'flex items-center justify-center w-full h-full p-4 relative'
//         }>
//         <input {...getInputProps()} id='thumbnail' />
//         {renderContent()}
//       </CardContent>
//     </Card>
//   );
// }
