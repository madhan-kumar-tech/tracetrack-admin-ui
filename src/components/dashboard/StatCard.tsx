import cardDesign from '../../assets/card_design.svg';

export function StatCard({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow"
      style={{ maxWidth: 366, width: '100%', height: 182 }}
    >
      {/* Right-side decorative SVG */}
      <img
        src={cardDesign}
        alt="card design"
        className="pointer-events-none absolute top-4 right-1 select-none"
        draggable={false}
      />
      {/* Icon with circular gray background */}
      <div className="mb-6 flex items-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <img src={icon} alt="" className="h-8 w-8 object-contain" />
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-jost text-3xl leading-tight font-semibold text-gray-900">
          {value}
        </span>
        <span className="font-regular mt-1 text-sm text-gray-500">{title}</span>
      </div>
    </div>
  );
}
