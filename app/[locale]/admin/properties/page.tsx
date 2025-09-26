import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Suspense } from 'react';
import RevalidateData from '../_components/revalidate-data';
import PropertiesListTable from './_components/properties-list-table';
import PropertyTableRowLoader from './_components/property-table-loader';

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function PropertiesPage() {
  return (
    <div className={'px-8 space-y-6'}>
      <Card>
        <CardHeader>
          <CardTitle>Properties List</CardTitle>
          <CardDescription>
            Manage your properties here. Here you can check how many properties
            already registered here.
          </CardDescription>

          <RevalidateData tagName='properties' type='page' />
        </CardHeader>

        <Suspense fallback={<PropertyTableRowLoader />}>
          <PropertiesListTable />
        </Suspense>
      </Card>
    </div>
  );
}

// async function RenderProperties() {
//   await new Promise((resolve) => setTimeout(resolve, 10000)); // Simulate a delay
//   const properties = await getCachedProperties({ limit: 30, offset: 0 });

//   return (
//     <CardContent>
//       {properties.length <= 0 ? (
//         <p className={'text-lg text-center text-muted-foreground'}>
//           No properties found. Please add some properties to see them listed
//           here.
//         </p>
//       ) : (
//         <div className={'grid grid-cols-3 gap-4'}>
//           {properties.map((property) => (
//             <Card key={property.id} className={''}>
//               <CardHeader>
//                 <CardTitle className={'space-y-2'}>
//                   <Badge className={'capitalize'}>{property.type}</Badge>
//                 </CardTitle>
//               </CardHeader>

//               <CardContent>
//                 <AspectRatio ratio={1 / 1}>
//                   <Image
//                     src={property.images[0]}
//                     alt={property.type}
//                     className={'w-full h-full object-cover rounded-xl'}
//                     width={400}
//                     height={300}
//                     priority
//                   />
//                 </AspectRatio>
//               </CardContent>

//               <CardContent className={'flex flex-wrap gap-2'}>
//                 <Badge>
//                   Author: <br /> {property.author.fullName}
//                 </Badge>
//                 <Badge>Likes: {property.receivedLikes.length}</Badge>
//                 <Badge>
//                   AuthorID: <br /> {property.author.id}
//                 </Badge>
//               </CardContent>

//               <CardContent>
//                 <p className={'line-clamp-2 truncate'}>
//                   {property.description}
//                 </p>
//                 <p>Location: {property.city}</p>
//                 <p>
//                   Address: {property.address}, {property.zipcode}
//                 </p>
//                 <p>Country: {property.country},</p>
//                 <p>State: {property.state}</p>
//               </CardContent>

//               <CardFooter className={'w-full'}>
//                 <Button className={'w-full'}>See more details</Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}
//     </CardContent>
//   );
// }

// function RenderPropertiesSkeleton() {
//   return (
//     <div className={'grid grid-cols-3 gap-4'}>
//       {Array.from({ length: 10 }).map((_, index) => (
//         <Card key={index} className={'animate-pulse'}>
//           <CardHeader>
//             <CardTitle className={'space-y-2'}>
//               <Badge className={'capitalize'}>Loading...</Badge>
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             <AspectRatio ratio={1 / 1}>
//               <Skeleton className={'w-full h-full rounded-xl'} />
//             </AspectRatio>
//           </CardContent>

//           <CardContent className={'flex flex-wrap gap-2'}>
//             <Skeleton className={'h-6 w-32'} />
//             <Skeleton className={'h-6 w-24'} />
//             <Skeleton className={'h-6 w-24'} />
//             <Skeleton className={'h-6 w-32'} />
//           </CardContent>

//           <CardContent className={' space-y-2'}>
//             <Skeleton className={'h-6 w-full'} />
//             <Skeleton className={'h-6 w-full'} />
//             <Skeleton className={'h-6 w-full'} />
//             <Skeleton className={'h-6 w-full'} />
//             <Skeleton className={'h-6 w-full'} />
//           </CardContent>
//           <CardFooter className={'w-full'}>
//             <Button className={'w-full'}>Loading...</Button>
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   );
// }
