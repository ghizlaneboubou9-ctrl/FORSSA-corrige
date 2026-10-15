export interface Professional {
  id: number
  name: string
  profession: string
  location: string
  rating: number
  reviewCount: number
  completedJobs: number
  verified: boolean
  available: boolean
  photo: string
  description: string
  skills: string[]
  hourlyRate: number
  category: string
  responseTime: string
  memberSince: string
}

export const professionals: Professional[] = [
  {
    id: 1,
    name: 'Mohammed Alami',
    profession: 'Électricien certifié',
    location: 'Casablanca',
    rating: 4.9,
    reviewCount: 87,
    completedJobs: 142,
    verified: true,
    available: true,
    photo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e',
    description: 'Électricien avec 12 ans d\'expérience. Spécialiste en installation électrique résidentielle et commerciale, domotique et panneaux solaires. Intervention rapide et travail soigné garanti.',
    skills: ['Installation électrique', 'Tableau électrique', 'Domotique', 'Panneaux solaires', 'Câblage réseau', 'Éclairage LED'],
    hourlyRate: 150,
    category: 'Électricité',
    responseTime: '< 1 heure',
    memberSince: 'Janvier 2024',
  },
  {
    id: 2,
    name: 'Youssef Benali',
    profession: 'Plombier',
    location: 'Marrakech',
    rating: 4.8,
    reviewCount: 134,
    completedJobs: 203,
    verified: true,
    available: true,
    photo: 'https://images.unsplash.com/photo-1676210133055-eab6ef033ce3',
    description: 'Expert en plomberie sanitaire, chauffage central et chauffe-eau solaires. Intervention rapide sur toute la région de Marrakech-Tensift.',
    skills: ['Plomberie sanitaire', 'Chauffe-eau solaire', 'Chauffage central', 'Réparation fuites', 'Installation salle de bain', 'Pompe à chaleur'],
    hourlyRate: 120,
    category: 'Plomberie',
    responseTime: '< 2 heures',
    memberSince: 'Mars 2023',
  },
  {
    id: 3,
    name: 'Hassan Tazi',
    profession: 'Entrepreneur en bâtiment',
    location: 'Casablanca',
    rating: 4.7,
    reviewCount: 56,
    completedJobs: 89,
    verified: true,
    available: false,
    photo: 'https://images.unsplash.com/photo-1787672357491-d43acdf974cb',
    description: 'Spécialiste en construction résidentielle et commerciale, rénovation et aménagement intérieur depuis 15 ans. Équipe complète disponible.',
    skills: ['Maçonnerie', 'Rénovation complète', 'Carrelage', 'Enduit & crépi', 'Construction neuve', 'Aménagement intérieur'],
    hourlyRate: 200,
    category: 'Construction',
    responseTime: '< 3 heures',
    memberSince: 'Juin 2023',
  },
  {
    id: 4,
    name: 'Karim Idrissi',
    profession: 'Développeur & Technicien IT',
    location: 'Rabat',
    rating: 4.6,
    reviewCount: 41,
    completedJobs: 67,
    verified: true,
    available: true,
    photo: 'https://images.unsplash.com/photo-1737573477556-ac3ed2db618c',
    description: 'Développeur web full-stack et technicien IT certifié. Création de sites web, applications mobiles, maintenance informatique et sécurité réseau.',
    skills: ['Développement web', 'React & Node.js', 'Réseau & infrastructure', 'Cybersécurité', 'Maintenance PC', 'Serveurs Linux'],
    hourlyRate: 250,
    category: 'Informatique',
    responseTime: '< 30 min',
    memberSince: 'Septembre 2023',
  },
  {
    id: 5,
    name: 'Sara Mansouri',
    profession: 'Service à domicile',
    location: 'Fès',
    rating: 4.9,
    reviewCount: 98,
    completedJobs: 215,
    verified: true,
    available: true,
    photo: 'https://images.unsplash.com/photo-1672748341520-6a839e6c05bb',
    description: 'Service de ménage professionnel et fiable. Nettoyage complet, repassage et entretien général. Disponible 6 jours sur 7 avec matériel fourni.',
    skills: ['Nettoyage complet', 'Repassage', 'Cuisine marocaine', 'Jardinage', 'Garde d\'enfants', 'Entretien général'],
    hourlyRate: 80,
    category: 'Services à domicile',
    responseTime: '< 1 heure',
    memberSince: 'Novembre 2022',
  },
  {
    id: 6,
    name: 'Omar Chraibi',
    profession: 'Peintre en bâtiment',
    location: 'Tanger',
    rating: 4.8,
    reviewCount: 72,
    completedJobs: 118,
    verified: true,
    available: true,
    photo: 'https://images.unsplash.com/photo-1758518727984-17b37f2f0562',
    description: 'Peintre qualifié spécialisé en peinture décorative, enduits et revêtements. Travail soigné, finitions impeccables et délais respectés.',
    skills: ['Peinture intérieure', 'Peinture extérieure', 'Enduit décoratif', 'Tadelakt', 'Ravalement façade', 'Décoration murale'],
    hourlyRate: 100,
    category: 'Peinture',
    responseTime: '< 2 heures',
    memberSince: 'Avril 2023',
  },
]

export const categories = [
  { name: 'Construction', emoji: '🏗️', count: 234, bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
  { name: 'Peinture', emoji: '🎨', count: 156, bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
  { name: 'Plomberie', emoji: '🔧', count: 198, bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100' },
  { name: 'Électricité', emoji: '⚡', count: 312, bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-100' },
  { name: 'Informatique', emoji: '💻', count: 145, bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' },
  { name: 'Services à domicile', emoji: '🏠', count: 287, bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' },
  { name: 'Transport', emoji: '🚚', count: 89, bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
  { name: 'Entreprises', emoji: '🏢', count: 67, bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
]

export const testimonials = [
  {
    id: 1,
    name: 'Rachid Bennani',
    role: 'Propriétaire, Casablanca',
    text: 'FORSSA m\'a permis de trouver un électricien qualifié en moins de 2 heures. Le système de suivi de travail était rassurant et tout s\'est passé parfaitement.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1758518727984-17b37f2f0562',
  },
  {
    id: 2,
    name: 'Nadia Alaoui',
    role: 'Directrice RH, Rabat',
    text: 'La plateforme est très professionnelle. J\'ai trouvé une équipe de construction fiable pour nos bureaux. Le contrat digital et le suivi d\'avancement nous ont vraiment aidés.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1787647562386-d6af94f91a24',
  },
  {
    id: 3,
    name: 'Amine Fassi',
    role: 'Entrepreneur, Marrakech',
    text: 'En tant que professionnel inscrit, FORSSA m\'a connecté avec des clients sérieux. Les contrats digitaux et le système d\'avis ont vraiment boosté ma réputation.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1728516687003-58347d3412b3',
  },
]

export const reviews = [
  {
    id: 1,
    author: 'Khalid Berrada',
    date: '15 Août 2026',
    qualityRating: 5,
    deadlineRating: 4,
    professionalismRating: 5,
    comment: 'Excellent travail ! Mohammed a installé tout le tableau électrique de notre villa en 2 jours. Très professionnel et ponctuel. Je recommande vivement.',
    photo: 'https://images.unsplash.com/photo-1758518727984-17b37f2f0562',
    jobTitle: 'Installation tableau électrique villa',
  },
  {
    id: 2,
    author: 'Zineb Tahiri',
    date: '3 Septembre 2026',
    qualityRating: 5,
    deadlineRating: 5,
    professionalismRating: 5,
    comment: 'Je recommande vivement ! Travail impeccable, respect total des délais et tarifs très raisonnables. Fera à nouveau appel à ses services sans hésitation.',
    photo: 'https://images.unsplash.com/photo-1787647562386-d6af94f91a24',
    jobTitle: 'Mise aux normes installation électrique',
  },
  {
    id: 3,
    author: 'Mehdi Bousaid',
    date: '1 Septembre 2026',
    qualityRating: 4,
    deadlineRating: 5,
    professionalismRating: 5,
    comment: 'Très satisfait du résultat. Communication claire tout au long du projet. Travail propre et bien organisé.',
    photo: 'https://images.unsplash.com/photo-1728516687003-58347d3412b3',
    jobTitle: 'Installation éclairage LED terrasse',
  },
]

export const portfolioImages = [
  { src: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a', alt: 'Installation électrique complète', label: 'Tableau électrique résidentiel' },
  { src: 'https://images.unsplash.com/photo-1660330589693-99889d60181e', alt: 'Panneau électrique', label: 'Installation panneau solaire' },
  { src: 'https://images.unsplash.com/photo-1660330590022-9f4ff56b63f6', alt: 'Travaux électriques', label: 'Câblage réseau bureau' },
  { src: 'https://images.unsplash.com/photo-1660330589827-da8ab7dd3c02', alt: 'Compteur électrique', label: 'Remplacement compteur' },
  { src: 'https://images.unsplash.com/photo-1762381294832-256f555f2be8', alt: 'Chantier construction', label: 'Chantier résidentiel' },
  { src: 'https://images.unsplash.com/photo-1659353588842-891391e6fcd4', alt: 'Travaux finitions', label: 'Installation domotique' },
]
