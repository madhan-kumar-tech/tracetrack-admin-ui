import { StatCard } from '../dashboard/StatCard';

export interface CardGridItem {
  icon: string;
  title: string;
  value: string;
  onClick?: () => void;
}

export function CardGrid({
  items,
  addNewCard,
  columns = 4,
}: {
  items: CardGridItem[];
  addNewCard?: React.ReactNode;
  columns?: number;
}) {
  return (
    <div
      className={`grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-${columns}`}
    >
      {items.map((item, idx) => (
        <div key={item.title + idx} className="flex justify-center">
          <StatCard {...item} />
        </div>
      ))}
      {addNewCard && <div className="flex justify-center">{addNewCard}</div>}
    </div>
  );
}
