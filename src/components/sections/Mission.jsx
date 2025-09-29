import React from 'react';
import Section from '../ui/Section';
import Card from '../ui/Card';

const Mission = () => {
  return (
    <Section background="default" className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Mission, Vision & Values
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Our Mission */}
        <div className="text-center">
          <div className="mb-6">
            <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-blue-700">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="text-sm font-semibold">Healthcare Team</p>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Mission</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            To deliver innovative pharmaceutical solutions that improve global health outcomes through 
            scientific excellence and unwavering quality standards.
          </p>
        </div>

        {/* Our Vision */}
        <div className="text-center">
          <div className="mb-6">
            <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-green-700">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-2xl">👩‍⚕️</span>
                </div>
                <p className="text-sm font-semibold">Medical Excellence</p>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Vision</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            To be a globally recognized pharmaceutical company that sets industry standards for 
            innovation, quality, and patient-centered healthcare solutions.
          </p>
        </div>

        {/* Our Core Values */}
        <div className="text-center">
          <div className="mb-6">
            <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-purple-700">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-2xl">💊</span>
                </div>
                <p className="text-sm font-semibold">Pharmaceutical Innovation</p>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Core Values</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Integrity, innovation, and compassion guide our commitment to creating affordable, 
            accessible medicines that make a meaningful difference in people's lives.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Mission;