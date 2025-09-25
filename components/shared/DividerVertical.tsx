export default function DividerVertical({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col items-center h-full'>
      <span className='border-r border-secondary-100 h-full'></span>
      <span className='text-black text-xs font-medium'>{children}</span>
      <span className='border-r border-secondary-100 h-full'></span>
    </div>
  );
}
