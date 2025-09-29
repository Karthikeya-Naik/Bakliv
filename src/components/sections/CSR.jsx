import React from 'react';
import { Heart, GraduationCap, Leaf, Users, Globe, HandHeart } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';

const CSR = () => {
  const csrInitiatives = [
    {
      icon: Heart,
      title: 'Healthcare Access',
      description: 'Providing affordable medicines and healthcare services to underserved communities.',
      impact: '10,000+ patients served annually',
      color: 'red'
    },
    {
      icon: GraduationCap,
      title: 'Education Support',
      description: 'Funding educational programs and scholarships for medical students and healthcare professionals.',
      impact: '500+ scholarships provided',
      color: 'blue'
    },
    {
      icon: Leaf,
      title: 'Environmental Responsibility',
      description: 'Implementing sustainable practices and green manufacturing processes to protect our planet.',
      impact: '50% reduction in carbon footprint',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Community Development',
      description: 'Supporting local communities through health camps, awareness programs, and infrastructure development.',
      impact: '100+ community programs',
      color: 'purple'
    }
  ];

  const impactStats = [
    { number: '25K+', label: 'Lives Impacted', icon: Heart },
    { number: '100+', label: 'Communities Served', icon: Users },
    { number: '50+', label: 'Health Camps', icon: HandHeart },
    { number: '500+', label: 'Healthcare Workers Trained', icon: GraduationCap }
  ];

  const colorClasses = {
    red: { bg: 'bg-red-100', text: 'text-red-600', hover: 'group-hover:bg-red-600' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'group-hover:bg-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'group-hover:bg-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'group-hover:bg-purple-600' }
  };

  return (
    <Section background="gray" id="csr">
      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Corporate Social <span className="text-gradient">Responsibility</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Our mission extends beyond business. BAKLIV actively engages in CSR initiatives that address 
          healthcare access, education, and environmental responsibility.
        </p>
      </div>

      {/* CSR Initiatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {csrInitiatives.map((initiative, index) => (
          <Card key={index} className="group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className={`w-16 h-16 ${colorClasses[initiative.color].bg} rounded-xl flex items-center justify-center mb-6 ${colorClasses[initiative.color].hover} transition-colors duration-300`}>
              <initiative.icon className={`${colorClasses[initiative.color].text} group-hover:text-white transition-colors duration-300`} size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{initiative.title}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{initiative.description}</p>
            <div className={`inline-flex items-center px-3 py-1 rounded-full ${colorClasses[initiative.color].bg} text-sm font-semibold ${colorClasses[initiative.color].text}`}>
              {initiative.impact}
            </div>
          </Card>
        ))}
      </div>

      {/* Impact Statistics */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-16 animate-fade-in">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Our Social Impact
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-primary-600" size={28} />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center animate-fade-in">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 md:p-12 text-white">
          <Globe className="mx-auto mb-6" size={48} />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Making a Difference Together
          </h3>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Join us in our mission to create a healthier, more sustainable world. Together, 
            we can make a meaningful impact on communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary">
              Learn More About Our CSR
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary-600">
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CSR;