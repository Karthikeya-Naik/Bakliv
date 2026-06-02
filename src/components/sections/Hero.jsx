import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import Section from '../ui/Section';
import Expertise from './Expertise';
import { Link, useLocation } from 'react-router-dom';

// Centralized image imports
import heroImage1 from '../../assets/front-view-nurses-team-hospital-scaled.webp';
import heroImage2 from '../../assets/male-working-as-paediatrician-1-scaled.webp';
import heroImage3 from '../../assets/man-working-as-pharmacist-scaled.webp';
import pharmacistImage from '../../assets/man-working-as-pharmacist-scaled.webp';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const backgroundImages = [
    heroImage1,
    heroImage2,
    heroImage3
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  return (
    <>
      {/* Hero Section with Carousel - Full Width */}
      <div id="home" className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[87vh] overflow-hidden">
        {/* Background Images with Transitions */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}

        {/* Blue Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.85) 0%, rgba(34, 211, 238, 0.8) 50%, rgba(20, 184, 166, 0.85) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center pt-12 md:pt-20 lg:pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight">
                Empowering Health.
                <br />
                <span className="text-white/95">Enriching Lives.</span>
              </h1>
              
              <p className="text-xs sm:text-sm md:text-base lg:text-base text-white/90 mb-4 md:mb-6 max-w-2xl leading-relaxed font-light">
                Delivering trusted pharmaceutical solutions — built on 25 years of industry expertise, 
                driven by science, defined by quality, and committed to your well-being.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button 
                  className="inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto text-sm md:text-base"
                  style={{ 
                    backgroundColor: '#404899',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#404899';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#404899';
                  }}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  <Link to="/contact">Contact Us</Link>
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section - Side by Side Layout */}
      <Section background="default" className="py-4 md:py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              {/* Main Heading */}
              <div className="mb-4 md:mb-6">
                <h2
                  className="mb-3 md:mb-4 font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
                  style={{ color: '#54595f' }}
                >
                  Welcome to BAKLIV
                </h2>

                <p className="text-lg md:text-xl lg:text-lg font-medium" style={{ color: '#7a7a7a'}}>
                  Committed to Health, Powered by Science
                </p>
              </div>

              {/* Main Description */}
              <div className="mb-6 md:mb-12">
                <p className="text-sm leading-relaxed font-light" style={{ color: '#7a7a7a' }}>
                  With a legacy of over 25 years in the pharmaceutical industry, BAKLIV is committed to creating 
                  high-quality, accessible, and life-changing medicines that enhance health outcomes across 
                  generations. Powered by cutting-edge innovation and a deep understanding of patient needs, 
                  we continue to raise the standards of excellence in healthcare.
                </p>
              </div>

              {/* Three Feature Items */}
              <div className="space-y-4 md:space-y-6 lg:space-y-8">
                {/* Science-Driven Innovation */}
                <div className="flex items-start">
                  <div className="bg-blue-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-3 md:mr-4">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-medium mb-1 md:mb-2" style={{ color: '#54595f' }}>Science-Driven Innovation</h3>
                    <p className="leading-relaxed font-light text-xs md:text-sm" style={{ color: '#7a7a7a' }}>
                      We invest heavily in research and development to deliver cutting-edge treatments that meet evolving medical needs.
                    </p>
                  </div>
                </div>

                {/* International Standards */}
                <div className="flex items-start">
                  <div className="bg-green-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-3 md:mr-4">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-medium mb-1 md:mb-2" style={{ color: '#54595f' }}>International Standards</h3>
                    <p className="leading-relaxed font-light text-xs md:text-sm" style={{ color: '#7a7a7a' }}>
                      Every medicine we make goes through strict checks to ensure it's safe, effective, and reliable.
                    </p>
                  </div>
                </div>

                {/* Care That Goes Beyond Medicine */}
                <div className="flex items-start">
                  <div className="bg-purple-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-3 md:mr-4">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-medium mb-1 md:mb-2" style={{ color: '#54595f' }}>Care That Goes Beyond Medicine</h3>
                    <p className="leading-relaxed font-light text-xs md:text-sm" style={{ color: '#7a7a7a' }}>
                      We believe in supporting overall well-being—through affordable treatments, community outreach, and a deep commitment to healthier lives.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image - Hidden on mobile */}
            <div className="hidden lg:flex justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-lg">
                <img 
                  src={pharmacistImage}
                  alt="Pharmaceutical researcher examining colorful medicine capsules in glass containers"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Decorative Element */}
          <div className="text-center mt-8 md:mt-12 lg:mt-16">
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </Section>
      <Expertise></Expertise>
    </>
  );
};

export default Hero;