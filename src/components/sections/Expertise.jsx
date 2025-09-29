import React from 'react';
import { Award, Pill, Heart, Shield, Stethoscope, FlaskConical, Phone} from 'lucide-react';
import Section from '../ui/Section';

const Expertise = () => {
  return (
    <>
    <Section background="white" className="py-4" >
      <h2 className="text-4xl text-center md:text-5xl font-medium mb-12" style={{ color: '#54595f' }}>
          Our Expertise
        </h2>
      <div className="text-center mb-16 flex flex-row mx-36 space-x-32">
        
        <div className="flex flex-col items-center ml-5 w-24">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Award className="text-blue-600" size={32} />
          </div>
          <div className="text-4xl font-bold text-gray-700 mb-1">25+</div>
          <div className="text-gray-600 font-light text-md ">Years Of Experience</div>
        </div>
        <div className="max-w-4xl mx-auto mt-8">
          <p className=" leading-relaxed text-start font-light" style={{ color: '#333333' }}>
            We truly appreciate your trust as we begin this new chapter. Backed by over 25 years of industry expertise, 
            our team is committed to delivering high-quality pharmaceutical solutions with care and integrity. Your support means everything to us.
          </p>
        </div>
      </div>

      <div className="text-center mb-16 mx-8 my-32">
        <h3 className="text-2xl md:text-5xl font-medium mb-8" style={{ color: '#54595f' }}>
          We Provide Best Healthcare Solutions
        </h3>
        <p className="max-w-4xl mx-auto leading-relaxed font-light" style={{ color: '#54595f' }}>
          BAKLIV offers a diverse range of pharmaceutical products across critical therapeutic segments. 
          From everyday health essentials to advanced treatments, we bring solutions that matter.
        </p>
      </div>

      {/* Product Categories Grid */}
      <div className="mb-16 mx-24">
        {/* First row - 2 cards with w-1/2 each */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Prescription Drugs */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-row">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2 ml-4 mt-2" style={{ color: '#54595f' }}>Prescription Drugs</h4>
          </div>

          {/* OTC Products */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-row">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2 ml-4 mt-2" style={{ color: '#54595f' }}>OTC (Over-The-Counter) Products</h4>
          </div>
        </div>

        {/* Second row - 3 cards with equal width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Life-Saving Formulations */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-row">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2 ml-4 mt-2" style={{ color: '#54595f' }}>Life-Saving Formulations</h4>
          </div>

          {/* Nutraceuticals & Wellness Products */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-row">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2 ml-4" style={{ color: '#54595f' }}>Nutraceuticals & Wellness Products</h4>
          </div>

          {/* Specialty & Chronic Care Medicines */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-row">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Stethoscope className="w-6 h-6 text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold mb-2 ml-4" style={{ color: '#54595f' }}>Specialty & Chronic Care Medicines</h4>
          </div>
        </div>
      </div>

      {/* Why BAKLIV Section */}
      <div className="mx-8 md:mx-16 lg:mx-24 my-28">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left side - Image */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <img 
              src="src/assets/young-doctor-getting-ready-work-scaled.webp" 
              alt="Young Doctor" 
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
          
          {/* Right side - Content */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl md:text-5xl font-medium mb-4" style={{ color: '#54595f' }}>
              Why BAKLIV?
            </h3>
            <h4 className="text-xl md:text-2xl font-normal mb-6" style={{ color: '#54595f' }}>
              25 Years of Excellence. Zero Compromise on Quality.
            </h4>
            <p className="mb-8 font-extralight leading-relaxed" style={{ color: '#54595f' }}>
              With a deep-rooted commitment to innovation, quality assurance, and patient care, 
              BAKLIV stands as a pioneer in pharmaceutical manufacturing.
            </p>
            
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-4 flex items-center justify-center" style={{ backgroundColor: '#060f59' }}>
                  <div className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#060f59' }}></div>
                  </div>
                </div>
                <span className="font-light text-md" style={{ color: '#000105' }}>25+ Years in the Industry</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-4 flex items-center justify-center" style={{ backgroundColor: '#060f59' }}>
                  <div className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#060f59' }}></div>
                  </div>
                </div>
                <span className="font-light text-md" style={{ color: '#000105' }}>Strong Ethical and Scientific Framework</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-4 flex items-center justify-center" style={{ backgroundColor: '#060f59' }}>
                  <div className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#060f59' }}></div>
                  </div>
                </div>
                <span className="font-light text-md" style={{ color: '#000105' }}>Experienced and Skilled Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* New Section - Image on Right, Content on Left */}
      <div className="mx-8 md:mx-16 lg:mx-16 my-36">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left side - Content */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl md:text-5xl font-medium mb-4" style={{ color: '#54595f' }}>
              We Care Beyond the Product
            </h3>
            <h4 className="text-xl md:text-2xl font-medium mb-6" style={{ color: '#7a7a7a' }}>
              Responsible. Sustainable. Compassionate.
            </h4>
            <p className="mb-8 font-extralight leading-relaxed " style={{ color: '#54595f' }}>
              Our mission extends beyond business. BAKLIV actively engages in CSR initiatives that address healthcare access, education, and environmental responsibility.
            </p>
            
            <button 
              className="px-6 py-3 text-white font-medium rounded-lg flex items-center hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#181d54' }}
            >
              <svg className="w-5 h-5 mr-2 fs-[16px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="#181d54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
              </svg>
              Reach Out to Us
            </button>
          </div>
          
          {/* Right side - Image */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <img 
              src="src/assets/male-working-as-paediatrician-1-scaled.webp" 
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
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

export default Expertise;