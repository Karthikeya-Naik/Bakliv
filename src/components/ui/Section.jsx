import React from 'react';
import Container from './Container';

const Section = ({ 
  children, 
  className = '', 
  containerSize = 'default',
  padding = true,
  background = 'default'
}) => {
  const backgroundClasses = {
    default: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'gradient-bg text-white',
    dark: 'bg-gray-900 text-white'
  };

  return (
    <section className={`${padding ? 'section-padding' : ''} ${backgroundClasses[background]} ${className}`}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
};

export default Section;