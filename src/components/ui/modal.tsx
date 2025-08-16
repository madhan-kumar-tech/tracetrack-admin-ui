import { useEffect, type FC } from 'react';
import GradientText from './gradientText';
import { Button } from './button';

type Field = {
  name: string;
  label: string;
  type: 'text' | 'select';
  defaultValue?: string;
  placeholder?: string;
  options?: string[];
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: Field[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel?: string;
};

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
  submitLabel = 'Submit',
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="animate-fadeInScale relative w-full max-w-2xl rounded-lg bg-white p-6"
        style={{ minWidth: 1120 }}
        onClick={e => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex-1 text-center">
            <GradientText className="text-base uppercase" text={title} />
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white text-black hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries()) as Record<
              string,
              string
            >;
            onSubmit(data);
          }}
          className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2"
        >
          {fields.map(field => (
            <div key={field.name} className="flex flex-col">
              <label className="font-jost mb-3 text-lg font-semibold tracking-wide text-gray-800 uppercase">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  defaultValue={field.defaultValue || ''}
                  className="rounded-md border-0 bg-[#F5F7F9] px-6 py-4 text-base text-[#000424] focus:ring-2 focus:ring-[#8B004B] focus:outline-none"
                >
                  <option value="" disabled>
                    {field.placeholder || 'Select'}
                  </option>
                  {field.options?.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={field.name}
                  defaultValue={field.defaultValue || ''}
                  placeholder={field.placeholder || ''}
                  className="rounded-md border-0 bg-[#F5F7F9] px-6 py-4 text-base font-light text-[#000424] focus:ring-2 focus:ring-[#8B004B] focus:outline-none"
                />
              )}
            </div>
          ))}

          {/* Submit Button */}
          <div className="mt-8 flex justify-center md:col-span-2">
            <Button
              type="submit"
              className="from-primary-700 to-primary-500 hover:from-primary-800 hover:to-primary-600 w-1/3 bg-gradient-to-r py-3"
              size="md"
            >
              {submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
