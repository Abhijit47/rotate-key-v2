export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={
        'text-xs font-medium bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full'
      }>
      {children}
    </span>
  );
}
