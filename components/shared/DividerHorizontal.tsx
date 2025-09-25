export default function DividerHorizontal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-full grid gap-8'>
      <div className='flex w-full items-center rounded-full'>
        <div className='flex-1 border-b border-secondary-100'></div>
        <span className='text-secondary-700 text-xs font-semibold'>
          {children}
        </span>
        <div className='flex-1 border-b border-secondary-100'></div>
      </div>
    </div>
  );
}

// {
//   return (
//     <div className="w-full grid gap-8">
// <div className="flex w-full items-center rounded-full">
// <div className="flex-1 border-b border-indigo-600"></div>
//         <span className="text-indigo-600 text-lg font-semibold leading-8 px-8 py-3">
//           {children}
// </span>
// <div className="flex-1 border-b border-indigo-600"></div>
// </div>)}}
