// Rwanda Business Connect — App Constants

export const APP_NAME = 'Rwanda Business Connect'
export const APP_TAGLINE = 'Discover Businesses Across Rwanda'
export const SUPER_ADMIN_EMAIL = 'mushinzimanareuben@gmail.com'

// ============================================================
// Business Categories
// ============================================================
export const CATEGORIES = [
  { id: 'restaurants', label: 'Restaurants', labelRw: 'Resitora', icon: '🍽️', color: '#ef4444' },
  { id: 'hotels', label: 'Hotels', labelRw: 'Hoteli', icon: '🏨', color: '#3b82f6' },
  { id: 'schools', label: 'Schools', labelRw: 'Amashuri', icon: '🏫', color: '#8b5cf6' },
  { id: 'hospitals', label: 'Hospitals', labelRw: 'Ibitaro', icon: '🏥', color: '#ef4444' },
  { id: 'pharmacies', label: 'Pharmacies', labelRw: 'Farumasi', icon: '💊', color: '#10b981' },
  { id: 'real-estate', label: 'Real Estate', labelRw: 'Imitungo', icon: '🏠', color: '#f59e0b' },
  { id: 'construction', label: 'Construction', labelRw: 'Ubwubatsi', icon: '🏗️', color: '#92400e' },
  { id: 'electronics', label: 'Electronics', labelRw: 'Elegitoroniki', icon: '📱', color: '#6366f1' },
  { id: 'fashion', label: 'Fashion', labelRw: "Imyambaro y'ikirere", icon: '👗', color: '#ec4899' },
  { id: 'beauty', label: 'Beauty & Spa', labelRw: "Ubwiza n'Ispa", icon: '💅', color: '#f472b6' },
  { id: 'photography', label: 'Photography', labelRw: "Ifoto", icon: '📸', color: '#0ea5e9' },
  { id: 'agriculture', label: 'Agriculture', labelRw: 'Ubuhinzi', icon: '🌾', color: '#22c55e' },
  { id: 'transport', label: 'Transport', labelRw: 'Gutwara', icon: '🚗', color: '#64748b' },
  { id: 'technology', label: 'Technology', labelRw: 'Ikoranabuhanga', icon: '💻', color: '#7c3aed' },
  { id: 'tourism', label: 'Tourism', labelRw: 'Ubutalii', icon: '🦁', color: '#d97706' },
  { id: 'financial', label: 'Financial Services', labelRw: 'Serivisi z\'Imari', icon: '💰', color: '#059669' },
  { id: 'lawyers', label: 'Lawyers', labelRw: 'Abavoka', icon: '⚖️', color: '#1d4ed8' },
  { id: 'accountants', label: 'Accountants', labelRw: 'Inzobere z\'Imari', icon: '📊', color: '#0369a1' },
  { id: 'freelancers', label: 'Freelancers', labelRw: 'Abakora Ubwabo', icon: '👨‍💻', color: '#7c3aed' },
  { id: 'other', label: 'Other', labelRw: 'Ibindi', icon: '🏢', color: '#6b7280' },
]

// ============================================================
// Rwanda Cities & Districts
// ============================================================
export const PROVINCES = [
  'Kigali City',
  'Northern Province',
  'Southern Province',
  'Eastern Province',
  'Western Province',
]

export const CITIES = [
  { name: 'Kigali', district: 'Gasabo', province: 'Kigali City', image: '/images/kigali.jpg' },
  { name: 'Musanze', district: 'Musanze', province: 'Northern Province', image: '/images/musanze.jpg' },
  { name: 'Rubavu', district: 'Rubavu', province: 'Western Province', image: '/images/rubavu.jpg' },
  { name: 'Huye', district: 'Huye', province: 'Southern Province', image: '/images/huye.jpg' },
  { name: 'Nyagatare', district: 'Nyagatare', province: 'Eastern Province', image: '/images/nyagatare.jpg' },
  { name: 'Muhanga', district: 'Muhanga', province: 'Southern Province', image: '/images/muhanga.jpg' },
  { name: 'Rwamagana', district: 'Rwamagana', province: 'Eastern Province', image: '/images/rwamagana.jpg' },
  { name: 'Rusizi', district: 'Rusizi', province: 'Western Province', image: '/images/rusizi.jpg' },
]

export const DISTRICTS = [
  // Kigali City
  'Gasabo', 'Kicukiro', 'Nyarugenge',
  // Northern
  'Burera', 'Gakenke', 'Gicumbi', 'Musanze', 'Rulindo',
  // Southern
  'Gisagara', 'Huye', 'Kamonyi', 'Muhanga', 'Nyamagabe', 'Nyanza', 'Nyaruguru', 'Ruhango',
  // Eastern
  'Bugesera', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Nyagatare', 'Rwamagana',
  // Western
  'Karongi', 'Ngororero', 'Nyabihu', 'Nyamasheke', 'Rubavu', 'Rutsiro', 'Rusizi',
]

// ============================================================
// Subscription Plans
// ============================================================
export const PLANS = [
  {
    id: 'free',
    name: 'Free',
    nameRw: 'Ubuntu',
    price: 0,
    priceLabel: 'Free',
    period: 'forever',
    color: 'gray',
    features: [
      '1 Business Listing',
      'Basic Contact Info',
      'Business Hours',
      '5 Photos',
      'Community Support',
    ],
    limitations: ['No Featured Listing', 'No Verified Badge', 'No Analytics'],
  },
  {
    id: 'standard',
    name: 'Standard',
    nameRw: 'Igiciro',
    price: 15000,
    priceLabel: '15,000 RWF/month',
    period: 'month',
    color: 'primary',
    popular: true,
    features: [
      '3 Business Listings',
      'Full Contact Info',
      'Gallery (20 Photos)',
      'WhatsApp Button',
      'Analytics Dashboard',
      'Verified Badge',
      'Priority Support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    nameRw: 'Nziza',
    price: 35000,
    priceLabel: '35,000 RWF/month',
    period: 'month',
    color: 'gold',
    features: [
      'Unlimited Listings',
      'Featured on Homepage',
      'Sponsored Listing',
      'Unlimited Photos',
      'Advanced Analytics',
      'Verified + Featured Badge',
      'Social Media Links',
      'Dedicated Support',
      'Banner Advertisement',
    ],
  },
]

// ============================================================
// User Roles
// ============================================================
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  BUSINESS_OWNER: 'business_owner',
  VISITOR: 'visitor',
}

// ============================================================
// Business Status
// ============================================================
export const BUSINESS_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
}

// ============================================================
// Days of Week
// ============================================================
export const DAYS = [
  { id: 'monday', label: 'Monday', labelRw: 'Kuwa Mbere' },
  { id: 'tuesday', label: 'Tuesday', labelRw: 'Kuwa Kabiri' },
  { id: 'wednesday', label: 'Wednesday', labelRw: 'Kuwa Gatatu' },
  { id: 'thursday', label: 'Thursday', labelRw: 'Kuwa Kane' },
  { id: 'friday', label: 'Friday', labelRw: 'Kuwa Gatanu' },
  { id: 'saturday', label: 'Saturday', labelRw: 'Kuwa Gatandatu' },
  { id: 'sunday', label: 'Sunday', labelRw: 'Ku Cyumweru' },
]

// ============================================================
// Social Media Platforms
// ============================================================
export const SOCIAL_PLATFORMS = [
  { id: 'facebook', label: 'Facebook', icon: 'FiFacebook', color: '#1877f2', prefix: 'https://facebook.com/' },
  { id: 'instagram', label: 'Instagram', icon: 'FiInstagram', color: '#e1306c', prefix: 'https://instagram.com/' },
  { id: 'twitter', label: 'Twitter/X', icon: 'FiTwitter', color: '#1da1f2', prefix: 'https://twitter.com/' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'FiLinkedin', color: '#0a66c2', prefix: 'https://linkedin.com/company/' },
  { id: 'youtube', label: 'YouTube', icon: 'FiYoutube', color: '#ff0000', prefix: 'https://youtube.com/' },
  { id: 'tiktok', label: 'TikTok', icon: 'SiTiktok', color: '#000000', prefix: 'https://tiktok.com/@' },
]

// ============================================================
// Statistics (demo data)
// ============================================================
export const STATS = [
  { value: '5,000+', label: 'Businesses Listed', labelRw: 'Ibigo byanditse', icon: '🏢' },
  { value: '30', label: 'Districts Covered', labelRw: 'Akarere kavugwa', icon: '📍' },
  { value: '50,000+', label: 'Monthly Visitors', labelRw: 'Abasura buri kwezi', icon: '👥' },
  { value: '19+', label: 'Categories', labelRw: "Inzego z'akazi", icon: '📂' },
]

// ============================================================
// Testimonials (demo data)
// ============================================================
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Jean-Pierre Habimana',
    role: 'Restaurant Owner',
    city: 'Kigali',
    avatar: null,
    rating: 5,
    text: 'Rwanda Business Connect helped me get 3x more customers in just 2 months. The platform is incredibly easy to use and the verified badge gives customers confidence.',
    textRw: 'Rwanda Business Connect yanmfashije kubona abakiriya 3x benshi mu mezi 2 gusa. Platform ni yoroshye cyane gukoreshwa kandi indangagaciro yemeranywe itanga ikizere ku bakiriya.',
  },
  {
    id: 2,
    name: 'Agathe Uwimana',
    role: 'Hotel Manager',
    city: 'Musanze',
    avatar: null,
    rating: 5,
    text: 'The best platform to showcase our hotel to tourists visiting Rwanda. We\'ve seen incredible growth in bookings since we joined the premium plan.',
    textRw: "Platform nziza cyane yo kwerekana hoteli yacu ku basuye Rwanda. Tubonye iyerekana ryihuse mu bwinjira kuva twinjiye gahunda ya premium.",
  },
  {
    id: 3,
    name: 'Emmanuel Nkurunziza',
    role: 'Tech Freelancer',
    city: 'Kigali',
    avatar: null,
    rating: 5,
    text: 'As a freelance developer, this platform gave me the visibility I needed. Clients now find me easily and trust my profile because of the verified badge.',
    textRw: "Nk'umutekinisiye wigenga, iyi platform yampaye ibiboneka nakeneye. Abakiriya nonaha bambona ntagira ikibazo kandi bizerana umwirondoro wanjye kubera indangagaciro yemeranywe.",
  },
  {
    id: 4,
    name: 'Marie-Claire Mukamana',
    role: 'Pharmacy Owner',
    city: 'Huye',
    avatar: null,
    rating: 4,
    text: 'My pharmacy gets noticed now by people searching in Huye. The search filters make it easy for customers to find exactly what they need.',
    textRw: "Farumasi yanjye nonaha iyerekana abantu bashakisha i Huye. Gushakisha gufasha abakiriya kubona neza icyo bakeneye.",
  },
]

// ============================================================
// FAQ
// ============================================================
export const FAQS = [
  {
    q: 'How do I list my business?',
    qRw: 'Nzandika ite ubucuruzi bwanjye?',
    a: 'Simply create an account, choose the Business Owner role, and click "Add Business". Fill in your details and submit for review. Our team approves listings within 24 hours.',
    aRw: 'Fungura konti, hitamo umwuga wa Nyir\'ubucuruzi, hanyuma kanda "Ongeraho Ubucuruzi". Uzuza amakuru yawe usabe isuzuma. Itsinda ryacu ryemeza ibyanditswe mu masaha 24.',
  },
  {
    q: 'Is the free plan really free?',
    qRw: 'Gahunda ya Ubuntu ni ubuntu nyine?',
    a: 'Yes! The free plan allows you to list one business with basic information. You can upgrade anytime to get more features like analytics and featured placement.',
    aRw: 'Yego! Gahunda ya ubuntu ikuruhusha kwandika ubucuruzi bumwe n\'amakuru makuru. Ushobora kongera gahunda iwawe igihe cyose kugira ngo ubone ibintu byinshi nka analytique na setting yihariye.',
  },
  {
    q: 'How does the verification process work?',
    qRw: 'Gusuzuma bikorwa bite?',
    a: 'After submitting your listing, our admin team reviews your business information. Once verified, you\'ll receive a blue verified badge on your profile. The process takes 1-3 business days.',
    aRw: 'Nyuma yo kohereza urutonde, itsinda ryacu rya admin risuzuma amakuru y\'ubucuruzi bwawe. Iyo byemejwe, uzahabwa indangagaciro y\'ubururu yemejwe ku mwirondoro wawe. Inzira itwara iminsi 1-3 y\'akazi.',
  },
  {
    q: 'Which payment methods are accepted?',
    qRw: 'Ni ubuhe buryo bwo kwishyura bwemererwa?',
    a: 'We accept MTN Mobile Money and Airtel Money. Simply initiate the payment, confirm the push notification on your phone, and your subscription activates instantly.',
    aRw: 'Twemera MTN Mobile Money na Airtel Money. Tangira kwishyura, emeza notification y\'itumanaho ku telefone yawe, hanyuma ubwunganire bwawe butangira ako kanya.',
  },
  {
    q: 'Can I list businesses from any district in Rwanda?',
    qRw: 'Ushobora gushyiraho ubucuruzi buri akarere kose mu Rwanda?',
    a: 'Absolutely! Rwanda Business Connect covers all 30 districts across Rwanda\'s 5 provinces. Customers can search by province, district, or sector to find your business.',
    aRw: 'Rwose! Rwanda Business Connect irabara akarere ka 30 muri intara 5 z\'u Rwanda. Abakiriya bashobora gushakisha intara, akarere, cyangwa murenge kugira ngo babone ubucuruzi bwawe.',
  },
  {
    q: 'How do I get the Featured Listing badge?',
    qRw: 'Nabona bite indangagaciro ya Featured Listing?',
    a: 'Featured Listings are available on the Premium plan or can be purchased separately. Featured businesses appear at the top of search results and on our homepage.',
    aRw: 'Featured Listings ziragaragara kuri gahunda ya Premium cyangwa zishobora kugurwa zireke. Ubucuruzi bwatangajwe bugaragara hejuru y\'ibisubizo byo gushakisha no ku rupapuro rwacu rw\'ahabanza.',
  },
]

// ============================================================
// Navigation Links
// ============================================================
export const NAV_LINKS = [
  { path: '/', label: 'Home', labelRw: 'Ahabanza' },
  { path: '/businesses', label: 'Businesses', labelRw: 'Ubucuruzi' },
  { path: '/categories', label: 'Categories', labelRw: 'Inzego' },
  { path: '/cities', label: 'Cities', labelRw: 'Imijyi' },
  { path: '/pricing', label: 'Pricing', labelRw: 'Igiciro' },
  { path: '/contact', label: 'Contact', labelRw: 'Twandikire' },
]
