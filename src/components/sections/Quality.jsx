import React from 'react';
import { Shield, Award, CheckCircle, Zap, FileCheck, Microscope } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';

const Quality = () => {
  const qualityStandards = [
    {
      icon: Shield,
      title: 'GMP Certified',
      description: 'Good Manufacturing Practice certification ensuring highest quality standards in pharmaceutical production.',
      percentage: '100%'
    },
    {
      icon: Award,
      title: 'ISO Compliance',
      description: 'International Organization for Standardization compliance across all our manufacturing processes.',
      percentage: '100%'
    },
    {
      icon: FileCheck,
      title: 'FDA Approved',
      description: 'Food and Drug Administration approval for our pharmaceutical products and manufacturing facilities.',
      percentage: '100%'
    },
    {
      icon: Microscope,
      title: 'Quality Testing',
      description: 'Rigorous testing protocols at every stage of production to ensure safety and efficacy.',
      percentage: '100%'
    }
  ];

  const qualityProcess = [
    {
      step: '01',
      title: 'Raw Material Testing',
      description: 'Every ingredient undergoes comprehensive testing before entering our production process.'
    },
    {
      step: '02',
      title: 'Manufacturing Control',
      description: 'Continuous monitoring and quality checks throughout the entire manufacturing process.'
    },
    {
      step: '03',
      title: 'Final Product Analysis',
      description: 'Complete analysis of finished products to ensure they meet all safety and efficacy standards.'
    },
    {
      step: '04',
      title: 'Packaging & Distribution',
      description: 'Quality-controlled packaging and distribution to maintain product integrity until delivery.'
    }
  ];

  return (
    <Section id="quality">
      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Quality <span className="text-gradient">Assurance</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Every medicine we make goes through strict checks to ensure it's safe, effective, and reliable. 
          Our commitment to quality is unwavering and backed by international certifications.
        </p>
      </div>

      {/* Quality Standards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {qualityStandards.map((standard, index) => (
          <Card key={index} className="text-center group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
              <standard.icon className="text-green-600 group-hover:text-white transition-colors duration-300" size={32} />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">{standard.percentage}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{standard.title}</h3>
            <p className="text-gray-600 leading-relaxed">{standard.description}</p>
          </Card>
        ))}
      </div>

      {/* Quality Process */}
      <div className="bg-gray-50 rounded-3xl p-8 md:p-12 animate-fade-in">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Our Quality Control Process
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualityProcess.map((process, index) => (
            <div key={index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              {/* Connection Line */}
              {index < qualityProcess.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-200 z-0"></div>
              )}
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                  {process.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">{process.title}</h4>
                <p className="text-gray-600 text-center leading-relaxed">{process.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16 animate-fade-in">
        <div className="inline-flex items-center space-x-2 bg-green-50 px-6 py-3 rounded-full mb-4">
          <CheckCircle className="text-green-600" size={20} />
          <span className="text-green-800 font-semibold">Quality Guaranteed</span>
        </div>
        <p className="text-lg text-gray-600">
          Every BAKLIV product comes with our promise of quality, safety, and efficacy.
        </p>
      </div>
    </Section>
  );
};

export default Quality;