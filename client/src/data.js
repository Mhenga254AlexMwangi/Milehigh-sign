

export const company = {
  name: 'MileHigh Signs',
  logo: '/images/logo.jpeg',
  phone: '+254 790260335',
  whatsapp: '254704404413', // digits only, with country code
  email: 'milesighns@gmail.com',
  location: 'Nairobi, Kenya',
  mapQuery: 'Nairobi, Kenya', 
  social: [
    { label: 'Facebook', url: 'https://www.facebook.com/share/19CGHU5UrF/' },
    { label: 'Instagram', url: 'https://instagram.com/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/alex-mwangi-4a773740a?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { label: 'TikTok', url: 'https://www.tiktok.com/' }
  ]
};

// hero-bg.jpg is the main background photo. hesro-2 and hero-3 are optional extras that fade in after it.
export const heroBackground = '/images/hero-bg.jpg';
export const heroSlides = [
  '/images/hero-bg.jpeg',
  '/images/hero-2.jpeg',
  '/images/hero-3.jpeg'
];

export const aboutImages = ['/images/about-1.jpeg', '/images/about-2.jpeg'];

export const services = [
  { title: 'Signage', image: '/images/service-signage.jpeg',
    text: 'Shop signs, reception signs, 3D letters and illuminated signs built to be seen day and night.' },
  { title: 'Printing', image: '/images/service-printing.jpeg',
    text: 'Banners, posters, stickers, brochures and large-format prints with sharp colour and clean finishing.' },
  { title: 'Branding', image: '/images/service-branding.jpeg',
    text: 'Corporate, office and event branding that keeps your identity consistent everywhere people meet it.' },
  { title: 'Vehicle Branding', image: '/images/service-vehicle.jpeg',
    text: 'Cars, vans, trucks and full fleets turned into moving advertising.' },
  { title: 'Promotional Products', image: '/images/service-promo.jpeg',
    text: 'T-shirts, polo shirts, umbrellas, bottles, bags and more, printed with your mark.' }
];

export const categories = ['All', 'Signage', 'Corporate Branding', 'Vehicle Branding', 'Printing', 'Promotional Products', 'Events'];


export const projects = [
  { name: 'Retail storefront sign', category: 'Signage', image: '/images/p-signage-1.jpeg', text: 'Illuminated channel letters on a brushed metal fascia.' },
  { name: '3D reception wall', category: 'Signage', image: '/images/p-signage-2.jpeg', text: 'Layered acrylic logo for a corporate lobby.' },
  { name: 'Head office fit-out', category: 'Corporate Branding', image: '/images/p-corporate-1.jpeg', text: 'Wall graphics, door plates and directional signs across three floors.' },
  { name: 'Bank branch identity', category: 'Corporate Branding', image: '/images/p-corporate-2.jpeg', text: 'Complete interior and exterior branding rollout.' },
  { name: 'Delivery fleet wraps', category: 'Vehicle Branding', image: '/images/p-vehicle-1.jpeg', text: 'Full wraps for a fleet of cars.' },
  { name: 'Truck side panels', category: 'Vehicle Branding', image: '/images/p-vehicle-2.jpeg', text: 'Durable vinyl graphics for trucks.' },
  { name: 'Outdoor banners', category: 'Printing', image: '/images/p-print-1.jpeg', text: 'Weather-resistant large-format banners with reinforced edges.' },
  { name: 'Product brochures', category: 'Printing', image: '/images/p-print-2.jpeg', text: 'Full-colour brochures  .' },
  { name: 'Branded apparel', category: 'Promotional Products', image: '/images/p-promo-1.jpeg', text: 'Embroidered polo shirts for a staff uniform order.' },
  { name: 'Custom bottles and bags', category: 'Promotional Products', image: '/images/p-promo-2.jpeg', text: 'Corporate gift sets printed in one to three colours.' },
  { name: 'Product launch stage', category: 'Events', image: '/images/p-event-1.jpeg', text: 'Backdrop, pull-up banners and entrance signage.' },
  { name: 'Trade fair stand', category: 'Events', image: '/images/p-event-2.jpeg', text: 'Modular stand graphics designed, printed and installed.' }
];

export const serviceOptions = services.map(s => s.title);
