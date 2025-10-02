// import React from 'react';
// import { Microscope, Truck, Users, FileText, Globe, Headphones } from 'lucide-react';
// import Section from '../ui/Section';
// import Card from '../ui/Card';

// const Services = () => {
//   const services = [
//     {
//       icon: Microscope,
//       title: 'Research & Development',
//       description: 'Cutting-edge pharmaceutical research to develop innovative treatments and improve existing formulations.',
//       details: ['Clinical Trials', 'Drug Discovery', 'Formulation Development', 'Regulatory Support']
//     },
//     {
//       icon: FileText,
//       title: 'Regulatory Affairs',
//       description: 'Comprehensive regulatory support to ensure compliance with international pharmaceutical standards.',
//       details: ['FDA Approvals', 'Documentation', 'Compliance Audits', 'International Standards']
//     },
//     {
//       icon: Truck,
//       title: 'Supply Chain',
//       description: 'Reliable and efficient distribution network ensuring timely delivery of pharmaceutical products.',
//       details: ['Cold Chain', 'Logistics Management', 'Inventory Control', 'Global Distribution']
//     },
//     {
//       icon: Users,
//       title: 'Healthcare Partners',
//       description: 'Collaborative partnerships with healthcare providers to improve patient outcomes and accessibility.',
//       details: ['Hospital Partnerships', 'Clinic Support', 'Medical Training', 'Healthcare Programs']
//     },
//     {
//       icon: Globe,
//       title: 'Global Reach',
//       description: 'International pharmaceutical services and market access across multiple countries and regions.',
//       details: ['Export Services', 'Market Access', 'International Licensing', 'Global Compliance']
//     },
//     {
//       icon: Headphones,
//       title: 'Customer Support',
//       description: '24/7 professional support for healthcare providers, patients, and pharmaceutical partners.',
//       details: ['Technical Support', 'Product Information', 'Medical Inquiries', 'Emergency Response']
//     }
//   ];

//   return (
//     <Section background="gray" id="services">
//       <div className="text-center mb-16 animate-fade-in-up">
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//           Our <span className="text-gradient">Services</span>
//         </h2>
//         <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//           Comprehensive pharmaceutical services designed to support healthcare providers, 
//           patients, and partners throughout the entire healthcare ecosystem.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {services.map((service, index) => (
//           <Card key={index} className="group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
//             <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300">
//               <service.icon className="text-primary-600 group-hover:text-white transition-colors duration-300" size={32} />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
//             <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
//             <div className="space-y-2">
//               {service.details.map((detail, detailIndex) => (
//                 <div key={detailIndex} className="flex items-center space-x-2">
//                   <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
//                   <span className="text-gray-700 text-sm">{detail}</span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         ))}
//       </div>
//     </Section>
//   );
// };

// export default Services;