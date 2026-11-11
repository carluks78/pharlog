export const navigation = [
  { label: 'Qui sommes-nous ?', href: '/qui-sommes-nous' },
  { label: 'Solution WMS', href: '/solution-wms' },
  { label: 'Compatibilité LGO', href: '/compatibilite-lgo' },
  { label: 'Accompagnement', href: '/accompagnement' },
  { label: 'Fournitures', href: '/fournitures' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Actualités', href: '/actualites' },
] as const

export const features = [
  [
    'Cartographie des zones',
    'Chaque référence est localisée précisément dans le dépôt : fini les recherches à l’aveugle.',
  ],
  [
    'Réception et contrôle scannés',
    'Chaque colis reçu est contrôlé et rangé via scan, avec traçabilité immédiate.',
  ],
  [
    'Préparation guidée par PDA',
    'Des terminaux mobiles professionnels guident une préparation rapide et sans erreur.',
  ],
  [
    'Traçabilité complète des flux',
    'Les entrées, sorties et rangements sont suivis pour fiabiliser chaque mouvement.',
  ],
  ['Tableaux de bord', 'Rotation, dispersion et taux de service sont pilotés en temps réel.'],
  [
    'Réassort rayon automatisé',
    'Le réapprovisionnement des rayons est déclenché et suivi depuis le dépôt.',
  ],
] as const

export const deploymentSteps = [
  [
    '01',
    'Audit du dépôt',
    'Analyse de l’organisation, de la dispersion des références et des flux actuels.',
  ],
  ['02', 'Paramétrage du WMS', 'Cartographie des zones et connexion sécurisée avec votre LGO.'],
  ['03', 'Formation sur site', 'Prise en main des PDA et des nouveaux processus par vos équipes.'],
  [
    '04',
    'Suivi et optimisation',
    'Ajustements continus au fil de l’activité réelle de votre officine.',
  ],
] as const

export const gallery = [
  [
    'depot-pharmacie.webp',
    'Mezzanine et rayonnages',
    'Structure sur deux niveaux avec accès sécurisé pour maximiser la capacité de stockage.',
  ],
  [
    'mezzanine-stockage.webp',
    'Vue d’ensemble',
    'Allées de rayonnages structurées sur toute la longueur du dépôt.',
  ],
  [
    'references-etiquetees.webp',
    'Références étiquetées',
    'Chaque référence est identifiée et classée pour une préparation rapide.',
  ],
  [
    'rayon-officine.webp',
    'Optimisation du rayon',
    'L’organisation du dépôt se prolonge jusqu’au rayon.',
  ],
  [
    'entrepot-avant.webp',
    'Zones de stockage',
    'Allées cartographiées et références localisées sur chaque niveau.',
  ],
  [
    'devanture-officine.webp',
    'Devanture officine',
    'Un accompagnement qui va de la logistique à l’image de l’officine.',
  ],
  [
    'installation-rayonnages.webp',
    'Montage et fourniture',
    'Installation de rayonnages adaptés au volume et à la configuration.',
  ],
  [
    'depot-rayonnages.webp',
    'Rayonnages neufs',
    'Des linéaires prêts à être organisés par zone et catégorie.',
  ],
  [
    'rayonnages-cartobacs.webp',
    'Mezzanine et quai',
    'Une structure pensée pour fluidifier chaque réception.',
  ],
  [
    'reception-palettes.webp',
    'Réception et flux',
    'Une circulation dégagée entre le quai et les rayonnages.',
  ],
] as const

export const articles = [
  {
    slug: '5-signes-reorganiser-depot',
    title: '5 signes que votre dépôt a besoin d’être réorganisé',
    description:
      'Les signaux qui montrent qu’il est temps d’optimiser la logistique de votre dépôt de pharmacie.',
    intro:
      'Un dépôt de pharmacie mal organisé coûte cher, souvent sans qu’on s’en rende compte au quotidien. Voici les signaux qui doivent alerter.',
    sections: [
      [
        'Vos équipes passent trop de temps à chercher un produit',
        'Quand retrouver une référence prend plus de quelques secondes, l’organisation des emplacements n’est plus adaptée au volume ou à la rotation.',
      ],
      [
        'Les ruptures sont fréquentes malgré un stock suffisant',
        'Le produit est bien en dépôt, mais personne ne le trouve à temps : un symptôme classique d’un manque de codification claire.',
      ],
      [
        'Le rangement dépend d’une ou deux personnes',
        'Si seule une personne sait où est rangé quoi, l’organisation repose sur une mémoire individuelle plutôt que sur un système fiable.',
      ],
      [
        'Les livraisons s’accumulent avant d’être rangées',
        'Un goulot d’étranglement à la réception indique souvent que le circuit ne peut plus absorber le volume d’activité.',
      ],
      [
        'Personne ne connaît le stock réellement disponible',
        'Sans visibilité fiable par emplacement, il devient difficile d’anticiper les commandes ou d’éviter le surstock.',
      ],
    ],
  },
  {
    slug: 'pourquoi-un-wms',
    title: 'Pourquoi un WMS change la donne pour une officine',
    description:
      'Contrôle de réception, traçabilité et réassort : comment un WMS fiabilise les flux d’une pharmacie.',
    intro:
      'Un WMS n’est plus réservé aux grands entrepôts : de plus en plus d’officines l’adoptent pour fiabiliser leur gestion de stock.',
    sections: [
      [
        'Un contrôle de réception fiabilisé',
        'Chaque produit reçu est scanné et rattaché à un emplacement précis, éliminant les erreurs dès l’entrée en dépôt.',
      ],
      [
        'Une traçabilité complète',
        'À tout moment, l’équipe sait où se trouve un produit, en quelle quantité et depuis quand.',
      ],
      [
        'Un réassort de rayon optimisé',
        'Le WMS guide les équipes vers les emplacements à réapprovisionner en priorité.',
      ],
      [
        'Une organisation partagée',
        'Le dépôt devient un processus commun et documenté qui ne dépend plus d’une seule personne.',
      ],
    ],
  },
  {
    slug: 'cartobacs',
    title: 'Cartobacs : pourquoi adopter cette solution en dépôt',
    description:
      'Gain de place et manutention facilitée : les bénéfices des cartobacs dans un dépôt pharmaceutique.',
    intro:
      'Le cartobac s’impose comme une solution de stockage particulièrement adaptée au dépôt pharmaceutique.',
    sections: [
      [
        'Un gain de place réel',
        'Les cartobacs standardisent le rangement et optimisent chaque mètre linéaire de rayonnage.',
      ],
      [
        'Une meilleure lisibilité',
        'Chaque bac peut être étiqueté avec un code géographique clair pour accélérer la recherche.',
      ],
      [
        'Une manutention facilitée',
        'Plus légers et plus solides que des cartons réutilisés, ils réduisent la fatigue lors du prélèvement.',
      ],
      [
        'Une organisation durable',
        'Conçus pour un usage répété, ils gardent le dépôt organisé sur le long terme.',
      ],
    ],
  },
  {
    slug: 'logistique-2027',
    title: '2027 : la logistique, levier stratégique de l’officine',
    description:
      'Pourquoi la logistique de dépôt devient stratégique face aux nouvelles missions des pharmaciens.',
    intro:
      'L’année 2027 s’annonce comme un tournant pour la pharmacie d’officine française et son organisation logistique.',
    sections: [
      [
        'Un modèle économique qui se transforme',
        'Vaccination, dépistages et accompagnements patients prennent une place croissante. Le temps disponible devient une ressource stratégique.',
      ],
      [
        'Plus de missions, autant de contraintes physiques',
        'Chaque nouvelle mission consomme du temps, de l’espace et de l’attention dans des officines déjà sous tension.',
      ],
      [
        'La condition silencieuse des nouvelles missions',
        'Une pharmacie qui maîtrise ses flux dégage mécaniquement du temps pour le conseil, l’écoute et la relation patient.',
      ],
      [
        'Préparer 2027 dès aujourd’hui',
        'Géo-codes, terminaux mobiles et WMS adapté permettent d’absorber les nouvelles missions sans subir la transition.',
      ],
    ],
  },
] as const

export const lgos = ['WINPHARMA', 'LGPI', 'LEO', 'PHARMALAND', 'PHARMONY', 'SMART RX'] as const

export const pageSeo: Record<string, { title: string; description: string }> = {
  'qui-sommes-nous': {
    title: 'PHARLOG, expert logistique officinale à Hyères',
    description:
      'Découvrez PHARLOG et Cédric Marmouget, spécialiste du WMS et de la logistique des pharmacies.',
  },
  'solution-wms': {
    title: 'WMS GCO pour dépôt de pharmacie | PHARLOG',
    description:
      'Cartographiez votre dépôt, scannez les réceptions et automatisez le réassort avec le WMS GCO.',
  },
  'compatibilite-lgo': {
    title: 'WMS compatible avec tous les LGO | PHARLOG',
    description:
      'PHARLOG se connecte à Winpharma, LGPI, LEO, Pharmaland, Pharmony et Smart RX sans modifier votre LGO.',
  },
  accompagnement: {
    title: 'Audit logistique de pharmacie à Hyères | PHARLOG',
    description:
      'Audit de dépôt, paramétrage WMS, formation sur site et optimisation continue par PHARLOG.',
  },
  fournitures: {
    title: 'Fournitures pour dépôt de pharmacie | PHARLOG',
    description:
      'Rayonnages, cartobacs, bacs navettes et imprimantes pour organiser votre dépôt de pharmacie.',
  },
  realisations: {
    title: 'Dépôts de pharmacie réalisés par PHARLOG',
    description:
      'Découvrez des dépôts pharmaceutiques réorganisés : mezzanines, rayonnages, réception et flux.',
  },
  actualites: {
    title: 'Actualités logistique et officine | PHARLOG',
    description:
      'Conseils et retours d’expérience autour de la logistique pharmaceutique et du WMS GCO.',
  },
  contact: {
    title: 'Demande sur mesure pour votre officine | PHARLOG',
    description:
      'Décrivez votre dépôt, votre LGO et vos objectifs pour recevoir un diagnostic logistique sur mesure.',
  },
}
