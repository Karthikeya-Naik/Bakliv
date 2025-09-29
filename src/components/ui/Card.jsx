import React from 'react';

const Card = ({ children, className = '', hover = true, padding = true }) => {
  const baseClasses = `bg-white rounded-xl shadow-lg ${hover ? 'hover:shadow-xl transition-all duration-300 hover:-translate-y-2' : ''} ${padding ? 'p-6' : ''}`;
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;