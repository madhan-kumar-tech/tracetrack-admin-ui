import React from 'react';

interface GradientTextProps {
  text: string;
  className?: string; // for font size, weight, etc.
  from?: string; // custom start color (hex, var, etc.)
  to?: string; // custom end color
  direction?: string; // default top-to-bottom
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  className = 'text-sm font-bold',
  from = 'var(--color-primary-500)', // default start
  to = 'var(--color-primary-700)', // default end
  direction = 'to bottom', // default top → bottom
}) => {
  return (
    <span
      className={`${className} relative cursor-pointer bg-clip-text text-transparent transition-all duration-200 hover:underline hover:decoration-2 hover:underline-offset-4`}
      style={{
        backgroundImage: `linear-gradient(${direction}, ${from}, ${to})`,
      }}
    >
      {text}
    </span>
  );
};

export default GradientText;
