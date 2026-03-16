import { motion } from 'framer-motion';

const partners = [
  { id: 1, name: 'UAP Insurance', logo: '/images/partners/UAP.png' },
  { id: 2, name: 'Liberty Insurance', logo: '/images/partners/Liberty.jpg' },
  { id: 3, name: 'Jubilee Insurance', logo: '/images/partners/Jubilee.png' },
  { id: 4, name: 'IAA Healthcare', logo: '/images/partners/IAA.png' },
  { id: 5, name: 'AAR Healthcare', logo: '/images/partners/AAR.png' },
  { id: 6, name: 'Government of Uganda', logo: '/images/partners/gou.png' },
  { id: 7, name: 'Rotary', logo: '/images/partners/rotary.png' },
  { id: 8, name: 'UAP', logo: '/images/partners/uap.png' },
  { id: 9, name: 'World Health Organization', logo: '/images/partners/who.png' },
];

export default function PartnersCarousel() {
  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];
  
  // Calculate total width for animation (128px width + 48px gap = 176px per item)
  const itemWidth = 176;
  const totalWidth = partners.length * itemWidth;

  return (
    <section className="pt-4 pb-2 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto relative">
          {/* Left fade overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          
          {/* Right fade overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-12"
              animate={{
                x: [0, -totalWidth],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <motion.div
                  key={`${partner.id}-${index}`}
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: '128px', height: '64px' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}