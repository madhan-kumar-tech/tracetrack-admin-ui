import { StatCard } from './StatCard';
import addNewIcon from '../../assets/add_new_icon.svg';
import cardDesign from '../../assets/card_design.svg';
import GradientText from '../ui/gradientText';

export function StatsGrid({
  stats,
}: {
  stats: { icon: string; title: string; value: string }[];
}) {
  return (
    <div className="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <div key={stat.title} className="flex justify-center">
          <StatCard {...stat} />
        </div>
      ))}
      {/* Add New Device Card */}
      <div className="flex justify-center">
        <div
          className="relative flex min-h-[182px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow"
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
              <img
                src={addNewIcon}
                alt="Add New Device"
                className="h-8 w-8 object-contain"
              />
            </span>
          </div>
          <div className="flex flex-col">
            <GradientText
              className="font-jost text-xl leading-tight font-bold"
              text="Add New Device"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
