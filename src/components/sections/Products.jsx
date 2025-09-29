import React from 'react';
import { Pill, Stethoscope, FlaskConical, HeartPulse, Brain, Shield } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Products = () => {
  const productCategories = [
    {
      icon: Pill,
      title: 'General Medicines',
      description: 'Comprehensive range of everyday health essentials and common medications for various therapeutic needs.',
      features: ['Pain Relief', 'Antibiotics', 'Vitamins', 'Supplements']
    },
    {
      icon: HeartPulse,
      title: 'Cardiovascular',
      description: 'Advanced treatments for heart health and cardiovascular conditions with proven efficacy.',
      features: ['Heart Medications', 'Blood Pressure', 'Cholesterol', 'Cardiac Support']
    },
    {
      icon: Brain,
      title: 'Neurological',
      description: 'Specialized medications for neurological disorders and mental health conditions.',
      features: ['Neurotherapy', 'Mental Health', 'Pain Management', 'CNS Disorders']
    },
    {
      icon: Shield,
      title: 'Immunology',
      description: 'Immune system support and specialized treatments for autoimmune conditions.',
      features: ['Immunosuppressants', 'Vaccines', 'Allergy Relief', 'Immune Boosters']
    },
    {
      icon: Stethoscope,
      title: 'Critical Care',
      description: 'Life-saving medications and treatments for intensive care and emergency situations.',
      features: ['Emergency Meds', 'ICU Solutions', 'Anesthetics', 'Critical Support']
    },
    {
      icon: FlaskConical,
      title: 'Specialty Drugs',
      description: 'Cutting-edge treatments for rare diseases and specialized therapeutic areas.',
      features: ['Rare Diseases', 'Oncology', 'Biologics', 'Advanced Therapies']
    }
  ];

  return (
    <Section id="products">
      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Our <span className="text-gradient">Product Portfolio</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          BAKLIV offers a diverse range of pharmaceutical products across critical therapeutic segments. 
          From everyday health essentials to advanced treatments, we bring solutions that matter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {productCategories.map((category, index) => (
          <Card key={index} className="group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors duration-300">
              <category.icon className="text-primary-600 group-hover:text-white transition-colors duration-300" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{category.title}</h3>
            <p className="text-gray-600 mb-6 text-center leading-relaxed">{category.description}</p>
            <div className="space-y-2">
              {category.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center animate-fade-in">
        <p className="text-lg text-gray-600 mb-8">
          With a deep-rooted commitment to innovation, quality assurance, and patient care, 
          BAKLIV stands as a pioneer in pharmaceutical manufacturing.
        </p>
        <Button variant="primary" size="lg">
          Explore All Products
        </Button>
      </div>
    </Section>
  );
};

export default Products;