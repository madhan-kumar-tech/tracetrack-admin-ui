import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardGrid } from '../common/CardGrid';
import type { CardGridItem } from '../common/CardGrid';
import addNewIcon from '../../assets/add_new_icon.svg';
import cardDesign from '../../assets/card_design.svg';
import GradientText from '../ui/gradientText';
import Modal from '../ui/modal';

export function StatsGrid({
  stats,
}: {
  stats: { icon: string; title: string; value: string }[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fields = [
    {
      name: 'imei',
      label: 'IMEI NUMBER',
      type: 'text',
      defaultValue: '4589625784126633',
    },
    {
      name: 'simNumber',
      label: 'DEVICE SIM NUMBER',
      type: 'text',
      defaultValue: '9856231456789',
    },
    {
      name: 'deviceType',
      label: 'DEVICE TYPE',
      type: 'select',
      options: ['V5', 'S15'],
      defaultValue: 'V5',
    },
    {
      name: 'dealerLicense',
      label: 'DEALER LICENSE',
      type: 'text',
      defaultValue: 'N/A',
    },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    console.log('Form Submitted:', data);
    setIsModalOpen(false);
  };

  const cardItems: CardGridItem[] = stats.map(stat => ({
    ...stat,
    onClick: () => {
      // Example: navigate based on title, you can adjust as needed
      if (stat.title === 'Total Vehicles') navigate('/admin/stocks');
      else if (stat.title === 'Active Vehicles')
        navigate('/admin/stocks?tab=active');
      else if (stat.title === 'Expired Vehicles')
        navigate('/admin/stocks?tab=expired');
      else if (stat.title === 'Inactive Vehicles')
        navigate('/admin/stocks?tab=inactive');
      else if (stat.title === 'Stock') navigate('/admin/stocks?tab=stock');
    },
  }));

  return (
    <>
      <CardGrid
        items={cardItems}
        addNewCard={
          <div
            onClick={() => setIsModalOpen(true)}
            className="relative flex min-h-[182px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
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
        }
      />
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="NEW STOCK"
        // eslint-disable-next-line
        fields={fields as any}
        onSubmit={handleSubmit}
        submitLabel="Add New Stock"
      />
    </>
  );
}
