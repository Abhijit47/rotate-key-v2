type AvatarOverlayProps = {
  name: string;
  role: string;
};

export default function AvatarOverlay(props: AvatarOverlayProps) {
  const { name, role } = props;

  return (
    <div
      className={
        'bg-primary-600 absolute inset-0 opacity-0 group-hover:opacity-85 inline-grid w-full h-full place-items-center content-end gap-2 p-2 sm:p-4 transition-all delay-100 ease-in-out'
      }>
      <h4
        className={
          'text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-tertiary-50'
        }>
        {name}
      </h4>
      <p
        className={
          'text-xs xs:text-sm sm:text-base text-primary-200 font-medium'
        }>
        {role}
      </p>
    </div>
  );
}
