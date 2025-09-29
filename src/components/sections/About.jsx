import React from 'react';
import { CheckCircle, Target, Heart, Lightbulb } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We invest heavily in research and development to deliver cutting-edge treatments that meet evolving medical needs.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Every medicine we make goes through strict checks to ensure it\'s safe, effective, and reliable.'
    },
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'We believe in supporting overall well-being through affordable treatments, community outreach, and a deep commitment to healthier lives.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'With over 25 years of expertise, we maintain the highest standards in pharmaceutical manufacturing and healthcare solutions.'
    }
  ];

  return (
    <>
      {/* Hero Banner with Background Image and Gradient Overlay */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("src/assets/front-view-nurses-team-hospital-scaled.webp")',
            backgroundPosition: 'center 30%'
          }}
        />
        
        {/* Blue-Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 via-blue-400/70 to-green-400/80" />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up">
            About Us
          </h1>
        </div>
      </div>

      {/* Welcome to BAKLIV Section */}
      <Section background="white" className="pb-4">
        <div className="max-w-7xl px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-5xl font-semibold mb-6" style={{ color: '#54595f' }}>
                Welcome to BAKLIV
              </h2>
              <p className=" mb-6 leading-relaxed font-light" style={{ color: '#54595f' }}>
                At BAKLIV, we believe that health is not a privilege — it is a right. 
                Backed by over 25 years of expertise in the pharmaceutical industry, we are 
                committed to the mission of developing, manufacturing, and delivering effective, 
                affordable, and high-quality medicines that improve and save lives. Guided by scientific rigor, compassionate values, and innovative technologies, 
                we strive to provide transformative healthcare solutions that make a real difference.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-semibold mb-4" style={{ color: '#54595f' }}>Our Legacy</h3>
                  <h4 className="text-2xl font-medium text-gray-800 mb-3">
                    A Pillar of Trust Backed by 25 Years of Industry Expertise
                  </h4>
                  <p className="text-gray-700 leading-relaxed font-light">
                    With a legacy of over 25 years in the pharmaceutical industry, BAKLIV is 
                    built on a strong foundation of reliability, consistency, and integrity. 
                    Our unwavering commitment to excellence continues to drive better healthcare 
                    outcomes across geographies, cultures, and health systems.
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-medium text-gray-800 mb-3">A Global Impact</h4>
                  <p className="text-gray-700 leading-relaxed font-light">
                    From life-saving generics to advanced therapeutic formulations, our expanding 
                    portfolio reflects a deep understanding of patient needs and technological progress. 
                    Trusted by healthcare professionals and patients worldwide, our solutions make a 
                    lasting difference.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Doctor Image */}
            <div className="animate-fade-in ">
              <div className="w-[600px] h-[1000px]">
                <img 
                  src="src/assets/young-doctor-getting-ready-work-scaled.webp" 
                  alt="Healthcare Professional" 
                  className="w-[560px] h-[1000px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
      {/* Mission, Vision & Values Section */}
      <Section background="white" className="py-0">
      <div className="mx-4 sm:mx-6 lg:mx-8 my-0 py-0 xl:mx-12 2xl:mx-16">
        <div className="text-center mb-12 mt-16">
          <h2 className="text-3xl md:text-5xl lg:text-4xl font-semibold mb-6 animate-fade-in-up" style={{ color: '#54595f' }}>
            Mission, Vision & Values
          </h2>
        </div>
            {/* Mission, Vision, Values Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mission Card */}
              <Card className="text-center animate-fade-in-up overflow-hidden group cursor-pointer p-0 h-108">
                <div className="overflow-hidden">
                  <img 
                    src="src/assets/male-working-as-paediatrician-1-scaled.webp" 
                    alt="Our Mission" 
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="px-6 py-8 bg-white flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-blue-600" style={{ color: '#54595f' }}>
                    Our Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light text-sm pb-12 pt-1">
                    To deliver safe, innovative, and accessible healthcare solutions that 
                    enhance the lives of patients globally.
                  </p>
                </div>
              </Card>

              {/* Vision Card */}
              <Card className="text-center animate-fade-in-up overflow-hidden group cursor-pointer p-0 h-108" style={{ animationDelay: '0.1s' }}>
                <div className="overflow-hidden">
                  <img 
                    src="src/assets/front-view-nurses-team-hospital-scaled.webp" 
                    alt="Our Vision" 
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="px-6 py-8 bg-white flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-blue-600" style={{ color: '#54595f' }}>
                    Our Vision
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light text-sm pb-12 pt-1">
                    To be a globally respected pharmaceutical leader known for 
                    excellence in quality, innovation, & ethics.
                  </p>
                </div>
              </Card>

              {/* Values Card */}
              <Card className="text-center animate-fade-in-up overflow-hidden group cursor-pointer p-0 h-108" style={{ animationDelay: '0.2s' }}>
                <div className="overflow-hidden">
                  <img 
                    src="src/assets/view-vials-medicine-arrangement-scaled.webp" 
                    alt="Our Core Values" 
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="px-6 py-8 bg-white flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-blue-600" style={{ color: '#54595f' }}>
                    Our Core Values
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light text-sm pb-12 pt-1">
                    Integrity, Innovation, accountability, empathy, and excellence—these values 
                    drive everything we do at BAKLIV.
                  </p>
                </div>
              </Card>
            </div>
          </div>
          </Section>

      {/* Our Expertise Section */}
      <Section background="white">
        <div className="mx-4 sm:mx-6 lg:mx-8 my-0 xl:mx-12 2xl:mx-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate-fade-in-up" style={{ color: '#54595f' }}>
              Our Expertise
            </h2>
            <h3 className="text-xl md:text-2xl font-medium text-gray-600 mb-4">
              Comprehensive Pharmaceutical Solutions
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto font-light text-sm text-center">
              With a diverse and growing product range, BAKLIV specializes in:
            </p>
          </div>

          {/* Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8" style={{ color: '#54595f' }}>
            <Card className="text-center animate-fade-in-up">
              <h4 className="text-lg font-medium mb-3 mx-4" style={{ color: '#54595f' }}>
                Generic and branded prescription drugs
              </h4>
            </Card>
            
            <Card className="text-center animate-fade-in-up"  style={{ animationDelay: '0.1s'}}>
              <h4 className="text-lg font-medium mb-3">
                Over-the-counter (OTC) medications
              </h4>
            </Card>
            
            <Card className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-lg font-medium mb-3">
                Critical care and life-saving medicines
              </h4>
            </Card>
            
            <Card className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s'}}>
              <h4 className="text-lg font-medium mb-3">
                Nutraceuticals and wellness products
              </h4>
            </Card>
            
            <Card className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s'}}>
              <h4 className="text-lg font-medium mb-3">
                Pediatric and geriatric formulations
              </h4>
            </Card>
            
            <Card className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s'}}>
              <h4 className="text-lg font-medium mb-3">
                Dermatological and hormonal treatments
              </h4>
            </Card>
          </div>
        </div>
      </Section>

      {/* BAKLIV Trust Banner Section - Full Width (Outside of Section) */}
      <div className="w-full" style={{ backgroundColor: '#181d54' }}>
        <div className="px-8 md:px-16 lg:px-24 py-8 md:py-16">
          <div className="max-w-6xl text-left text-white">
            <h2 className="font-semibold mb-8 leading-tight" style={{ fontSize: '30px' }}>
              BAKLIV – A Name You Can Trust
            </h2>
            <div className="leading-relaxed mb-6 font-normal" style={{ fontSize: '16px' }}>
              <span className="inline">
                Whether you're a healthcare provider, pharmacist, patient, or partner—
              </span>
              <span className="font-bold">BAKLIV</span>
              <span className="inline">
                {" "}is here to support your journey to better health. Backed by decades of expertise, we remain committed to making a meaningful impact on lives, every single day.
              </span>
            </div>
            <p className="font-normal" style={{ fontSize: '16px' }}>
              <span className="font-bold">BAKLIV</span> — Empowering Health, Enriching Lives.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;