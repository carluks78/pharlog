import { articles, deploymentSteps, features, gallery, lgos } from '../../site-data'

export const runtime = 'nodejs'
export const maxDuration = 10

type ChatMessage = { role: 'user' | 'assistant'; content: string }
type KnowledgeEntry = { keywords: string[]; answer: string }

const featureText = features.map(([title, text]) => `${title} : ${text}`).join(' ')
const processText = deploymentSteps.map(([, title, text]) => `${title} : ${text}`).join(' ')
const realizationText = gallery.map(([, title, text]) => `${title} : ${text}`).join(' ')
const articleText = articles.map((article) => `${article.title} : ${article.description}`).join(' ')

const knowledge: KnowledgeEntry[] = [
  {
    keywords: [
      'pharlog',
      'entreprise',
      'societe',
      'qui',
      'propos',
      'activite',
      'mission',
      'presentation',
    ],
    answer:
      'PHARLOG est spécialiste du WMS GCO et de la logistique officinale. Sa mission est de transformer la réserve d’une pharmacie en dépôt structuré : zones cartographiées, réception contrôlée, préparation guidée, traçabilité et réassort. PHARLOG est basé à Hyères et fait partie de l’écosystème Global Pharma. Vous trouverez la présentation complète sur /qui-sommes-nous.',
  },
  {
    keywords: [
      'wms',
      'gco',
      'logiciel',
      'solution',
      'fonction',
      'fonctionnalite',
      'outil',
      'pda',
      'scan',
    ],
    answer: `Le WMS GCO est pensé pour les contraintes du dépôt d’officine. Il couvre : ${featureText} Le détail est disponible sur /solution-wms.`,
  },
  {
    keywords: [
      'deroulement',
      'etape',
      'projet',
      'deploiement',
      'installer',
      'installation',
      'commencer',
      'accompagnement',
      'audit',
      'formation',
      'suivi',
    ],
    answer: `Un projet PHARLOG suit quatre étapes : ${processText} Après votre demande, la promesse publiée est un retour d’expert sous 48 h. La durée totale du projet dépend du dépôt et doit être confirmée après audit. Consultez /accompagnement.`,
  },
  {
    keywords: [
      'lgo',
      'compatible',
      'compatibilite',
      'winpharma',
      'lgpi',
      'leo',
      'pharmaland',
      'pharmony',
      'smart',
      'connexion',
      'synchroniser',
    ],
    answer: `PHARLOG se connecte au LGO existant sans le modifier pour synchroniser stocks, commandes et mouvements. Les compatibilités publiées sont ${lgos.join(', ')}, avec une compatibilité annoncée « tous LGO ». Une configuration précise doit être validée via /compatibilite-lgo ou /contact.`,
  },
  {
    keywords: [
      'fourniture',
      'equipement',
      'cartobac',
      'bac',
      'rayonnage',
      'meuble',
      'imprimante',
      'etiquette',
      'mezzanine',
    ],
    answer:
      'PHARLOG propose des meubles et rayonnages modulables, cartobacs, bacs navettes à couvercle, bacs de rangement et imprimantes d’étiquettes couleur. Les étiquettes peuvent gérer promotions, prix barrés, bocaux, petits produits et couleurs de l’enseigne. Prix et dimensions sont établis sur demande selon le dépôt. Voir /fournitures.',
  },
  {
    keywords: ['prix', 'tarif', 'cout', 'combien', 'devis', 'budget', 'payer', 'abonnement'],
    answer:
      'PHARLOG ne publie pas de tarif standard : le prix dépend de la surface, des volumes, du LGO, des équipements et du niveau d’accompagnement. Je ne vais donc pas inventer un montant. Le formulaire /contact permet de décrire ces éléments afin d’obtenir une étude sur mesure.',
  },
  {
    keywords: [
      'gain',
      'benefice',
      'avantage',
      'valeur',
      'resultat',
      'performance',
      'chiffre',
      'remplissage',
      'boite',
      'reference',
      'temps',
    ],
    answer:
      'Les chiffres publiés sont : 100 K boîtes mises en rayon par jour, 120 K boîtes réceptionnées en moyenne, 15 K références en réserve géolocalisées et un taux de remplissage passé de 75 % avant WMS à 98 % après, soit +23 %. Les bénéfices recherchés sont moins de recherches, moins d’erreurs, un réassort plus fiable et des flux traçables. Ces résultats ne constituent pas une garantie contractuelle pour chaque officine.',
  },
  {
    keywords: [
      'reception',
      'controle',
      'livraison',
      'colis',
      'rangement',
      'tracabilite',
      'flux',
      'stock',
    ],
    answer:
      'À la réception, les produits sont scannés, contrôlés puis rattachés à un emplacement cartographié. Le WMS suit ensuite les entrées, sorties et rangements. Cela limite les erreurs dès l’arrivée des colis et donne une visibilité commune à l’équipe.',
  },
  {
    keywords: ['reassort', 'rayon', 'rupture', 'reapprovisionnement', 'remplissage'],
    answer:
      'Le WMS guide les équipes vers les références à réapprovisionner et suit le mouvement entre dépôt et rayon. L’objectif est de réduire les ruptures visibles, de prioriser les tâches et d’améliorer le taux de remplissage.',
  },
  {
    keywords: ['realisation', 'photo', 'exemple', 'client', 'depot', 'mezzanine', 'chantier'],
    answer: `Les réalisations publiées comprennent : ${realizationText} Les photographies et descriptions sont réunies sur /realisations.`,
  },
  {
    keywords: ['cedric', 'marmouget', 'fondateur', 'parcours', 'experience'],
    answer:
      'Cédric Marmouget a étudié la logistique, travaillé dans une grande gare de triage européenne puis orchestré la logistique de monguidesante.com. Il a fondé PHARLOG autour de la formation logistique des officines avant d’acquérir le WMS GCO.',
  },
  {
    keywords: ['article', 'actualite', 'blog', 'conseil', '2027', 'cartobacs', 'reorganiser'],
    answer: `Le blog PHARLOG couvre notamment : ${articleText} Tous les articles sont accessibles depuis /actualites.`,
  },
  {
    keywords: [
      'contact',
      'joindre',
      'email',
      'adresse',
      'telephone',
      'horaire',
      'localisation',
      'hyeres',
    ],
    answer:
      'PHARLOG est situé Maison 8 La Borlière, 53 rue Soldat Ferrari, 83400 Hyères. E-mail : contact@pharlog.fr. Le téléphone et les horaires ne sont pas publiés sur le site. Vous pouvez utiliser /contact pour une demande sur mesure.',
  },
  {
    keywords: ['demande', 'formulaire', 'mesure', 'diagnostic', 'rendez', 'rdv', 'reponse'],
    answer:
      'La demande sur mesure recueille le nom de la pharmacie, le contact, la ville, le LGO, le volume de boîtes, la surface, la taille d’équipe, les besoins, l’échéance et les objectifs. Elle calcule les leviers de valeur associés puis enregistre la demande de façon privée. Rendez-vous sur /contact.',
  },
  {
    keywords: ['donnee', 'rgpd', 'confidentialite', 'prive', 'securite', 'conservation'],
    answer:
      'Les demandes sont privées : le public peut soumettre un formulaire, mais ne peut ni lire, ni modifier, ni supprimer les dossiers. La politique publiée indique une conservation maximale de trois ans après le dernier contact en l’absence de relation commerciale. Consultez /rgpd.',
  },
  {
    keywords: ['page', 'menu', 'site', 'navigation', 'trouver', 'lien', 'sitemap'],
    answer:
      'Le site comporte des pages séparées : accueil /, présentation /qui-sommes-nous, WMS /solution-wms, LGO /compatibilite-lgo, accompagnement /accompagnement, fournitures /fournitures, réalisations /realisations, blog /actualites et demande /contact. Le sitemap public est disponible sur /sitemap.xml.',
  },
]

const stopWords = new Set([
  'avec',
  'dans',
  'pour',
  'mais',
  'donc',
  'vous',
  'nous',
  'votre',
  'cette',
  'comment',
  'quoi',
  'quel',
  'quelle',
  'des',
  'les',
  'une',
  'est',
  'sont',
  'sur',
  'tout',
])

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
}

function tokens(value: string) {
  return normalize(value)
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stopWords.has(token))
}

function localAnswer(messages: ChatMessage[]) {
  const userMessages = messages.filter((message) => message.role === 'user').slice(-3)
  const current = userMessages.at(-1)?.content || ''
  const context = userMessages.map((message) => message.content).join(' ')
  const normalized = normalize(current)
  if (/^(bonjour|bonsoir|salut|hello|coucou)\b/.test(normalized)) {
    return 'Bonjour. Je suis l’assistant virtuel PHARLOG. Vous pouvez me demander comment se déroule un projet, ce que fait le WMS GCO, si votre LGO est compatible, quels équipements sont proposés ou comment préparer une demande sur mesure.'
  }
  if (/\b(merci|parfait|super)\b/.test(normalized) && tokens(current).length < 4) {
    return 'Avec plaisir. Souhaitez-vous approfondir le WMS, la compatibilité de votre LGO, les fournitures ou le déroulement d’un projet PHARLOG ?'
  }
  const queryTokens = tokens(context)
  const ranked = knowledge
    .map((entry) => ({
      entry,
      score: entry.keywords.reduce(
        (total, keyword) =>
          total +
          (queryTokens.some(
            (token) => token === keyword || token.startsWith(keyword) || keyword.startsWith(token),
          )
            ? 2
            : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score)
  const selected = ranked.filter((item) => item.score > 0).slice(0, 2)
  if (!selected.length) {
    return 'Je n’ai pas identifié précisément votre demande, mais je peux répondre sur tout le site PHARLOG : WMS GCO, LGO, audit, déploiement, formation, réception, réassort, fournitures, réalisations, tarifs sur mesure, articles, contact et RGPD. Pouvez-vous préciser le sujet ou décrire votre problème de dépôt ?'
  }
  return selected.map((item) => item.entry.answer).join('\n\n')
}

function parseMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value)) return null
  const messages = value.slice(-12).flatMap((item): ChatMessage[] => {
    if (!item || typeof item !== 'object') return []
    const role = (item as Record<string, unknown>).role
    const content = (item as Record<string, unknown>).content
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return []
    const clean = content.trim().slice(0, 1500)
    return clean ? [{ role, content: clean }] : []
  })
  return messages.length ? messages : null
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Requête invalide.' }, { status: 400 })
  }
  const messages = parseMessages((body as Record<string, unknown>)?.messages)
  if (!messages) return Response.json({ error: 'Aucun message valide.' }, { status: 400 })
  return Response.json({ answer: localAnswer(messages), mode: 'knowledge-base' })
}
