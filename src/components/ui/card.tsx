export function Card({
  icon,
  title,
  value,
  children,
}: {
  icon?: string;
  title: string;
  value: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[120px] flex-col items-start rounded-lg bg-white p-6 shadow">
      {icon && <img src={icon} alt="" className="mb-4 h-8 w-8" />}
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="mt-1 text-sm text-gray-500">{title}</div>
      {children}
    </div>
  );
}
