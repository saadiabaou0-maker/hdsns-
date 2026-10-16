export interface PitchPreset {
  id: string;
  niche: string;
  service: string;
  channel: 'Instagram DM' | 'WhatsApp Audio' | 'Email';
  darija: {
    hook: string;
    body: string;
    callToAction: string;
  };
  french: {
    hook: string;
    body: string;
    callToAction: string;
  };
  followUpDarija: string;
  followUpFrench: string;
}

export const PITCH_PRESETS: PitchPreset[] = [
  {
    id: 'cafe-restaurant-reels',
    niche: 'Cafés & Restaurants locaux',
    service: 'Création de Reels & TikTok vidéos pour attirer des clients',
    channel: 'Instagram DM',
    darija: {
      hook: 'Salam khay [Ism dyal l-owner], tbarkellah 3la l-makla o l-ambiance 3ndkom f [Ism l-resto]!',
      body: 'Jit 3ndkom l-bare7 o 3jbni bzaf l-plat dyal [Ism l-plat]. 9adit likom wahed l-video reel 9sir dyal 30 seconde b camera na9ya o son trending bach tchoufouh. Had l-video fabor hadi cadeau!',
      callToAction: 'Ila 3jbatkom l-khedma o bghitou n9ad likom 10 d l-videos bhal hada f had ch-her bach t-tla3 l-page o yjiwkom n-nas, golohali nwerrikom l-programme.',
    },
    french: {
      hook: 'Bonjour [Nom du responsable], bravo pour l\'accueil et l\'ambiance chez [Nom du restaurant] !',
      body: 'Je suis créateur de contenu vidéo local. J\'ai préparé gratuitement pour votre restaurant un exemple de Reel dynamique de 30 secondes mettant en valeur vos spécialités du moment.',
      callToAction: 'Souhaitez-vous que je vous envoie la vidéo sans engagement ? Si le résultat vous plaît, je pourrais vous produire 8 à 12 vidéos par mois pour attirer plus de clients.',
    },
    followUpDarija: 'Salam khay, ghir bghit nt2aked wach wslatkom l-video cadeau li sift likom l-bare7 ? Dayra fiha bzaf d l-energie o ghat3jeb l-clientele dyalkom.',
    followUpFrench: 'Bonjour, je voulais juste m\'assurer que vous aviez bien reçu le lien de la vidéo offerte ? N\'hésitez pas si vous avez la moindre question !',
  },
  {
    id: 'dental-aesthetic-clinic',
    niche: 'Cabinets Dentaires & Centres Esthétiques',
    service: 'Gestion Google Business & Réassurance Patients',
    channel: 'Instagram DM',
    darija: {
      hook: 'Salam Docteur [Nom], tbarkellah 3likom o 3la l-cabinet dyalkom f [L-mdina].',
      body: 'La7edt bli l-page Instagram dyalkom ma fihaach bzaf d l-fidyowat tawdi7iya 3la (Hollywood smile / Blanchiment / Les soins), o n-nas kaykheffou yjiw 7it makanch char7 bayn. Ana kan-3awn les cabinets bhal dyalkom ywerriw les resultats avant/après o n-nas y-t9o fihom.',
      callToAction: 'Wach momkin n-sift lik 2 d les idees dyal videos sahline li y9edro yjibou lik 10 dyal les rendez-vous jdad had ch-her ?',
    },
    french: {
      hook: 'Bonjour Docteur, félicitations pour le professionnalisme de votre cabinet à [Ville].',
      body: 'Beaucoup de patients hésitent avant de prendre rendez-vous par manque de vidéos explicatives claires (soins, avant/après, témoignages). J\'accompagne les praticiens de santé pour moderniser leur visibilité et rassurer les nouveaux patients.',
      callToAction: 'Seriez-vous ouvert à ce que je vous partage 3 idées de vidéos courtes qui convertissent très bien pour les cabinets dentaires ?',
    },
    followUpDarija: 'Salam Docteur, juste un petit rappel. Wach 3ndkom 5 d9aye9 f l-weekend bach n-werrik les idees li wjjadt lik ?',
    followUpFrench: 'Bonjour Docteur, je me permets une brève relance. Auriez-vous 5 minutes cette semaine pour échanger sur vos objectifs de visibilité ?',
  },
  {
    id: 'boutique-vetements',
    niche: 'Boutiques de Vêtements & Chaussures',
    service: 'Passage de vente DM à un Store YouCan automatisé',
    channel: 'WhatsApp Audio',
    darija: {
      hook: 'Salam Si [Ism l-moul l-ma7al], tbarkellah 3la l-article jdad li 7ettito f l-page!',
      body: 'La7edt bli l-klyane kaygolo lik "prix en privé" o kaytsenaw bzaf bach tjaweb, o bzaf kaymchiw bla ma ychriw. 9adit likom wahed l-boutique YouCan khfifa fih les photos o l-formulaire d l-khedma dyal Cash on Delivery, bach l-klyane y-commander f 10 secondes.',
      callToAction: 'Bghiti nwerrik lien dyal l-boutique test fabor tchouf kifach ghadi t-ban l-sl3a dyalk ?',
    },
    french: {
      hook: 'Bonjour [Nom du gérant], très belle collection présentée sur votre page !',
      body: 'Actuellement, vos clients doivent attendre vos réponses par message privé pour commander, ce qui fait perdre jusqu\'à 40% des ventes impulsives. J\'ai conçu une démo de boutique en ligne simple avec paiement à la livraison (COD) pour vos articles.',
      callToAction: 'Puis-je vous envoyer le lien de démonstration en 1 minute sur WhatsApp ?',
    },
    followUpDarija: 'Salam khay, wach chfti l-boutique test ? T9ed tbdaha mn l-yoma o tbda tchouf les commandes kaydkhlou bla ma tb9a tjaweb kola wahed f DM.',
    followUpFrench: 'Bonjour, avez-vous pu jeter un coup d\'œil à la démo ? Cela peut être mis en place en 48 heures pour vos prochains arrivages.',
  },
  {
    id: 'ecommerce-ugc-creator',
    niche: 'Marques E-commerce & Produits Cosmétiques',
    service: 'Vidéos UGC (User Generated Content) TikTok Ads',
    channel: 'Instagram DM',
    darija: {
      hook: 'Salam l-equipe dyal [Nom de la marque], kanchouf les ads dyalkom dima f TikTok!',
      body: '3ndi experience f l-fidyowat dyal UGC (User Generated Content) li kayban fihom wahed kayjarreb l-produit b Darija 3afawiya bla tsanou3. Had les videos kay-tla3o l-taux de conversion f TikTok Ads bzaf.',
      callToAction: 'Wach bghitou n-sift likom wahed l-script dyal 30 secondes m9ad l had l-produit dyalkom bach t-jarbouh f les ads ?',
    },
    french: {
      hook: 'Bonjour à l\'équipe [Marque], vos publicités sponsorisées tournent très bien !',
      body: 'Je produis des formats vidéo UGC authentiques (avis utilisateur, unboxing et test produit face caméra) spécialement optimisés pour les algorithmes TikTok & Meta Ads au Maroc.',
      callToAction: 'Puis-je vous envoyer mon portfolio de vidéos et un concept de script pour votre produit phare ?',
    },
    followUpDarija: 'Salam, ghir bghit n-3ref wach ba9i khaskom des createurs UGC had ch-her bach n-proposi likom l-pack dyali ?',
    followUpFrench: 'Bonjour, cherchez-vous toujours des créateurs de contenu UGC pour vos prochaines campagnes publicitaires ?',
  },
];
