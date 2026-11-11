export type RequestFormData = {
  pharmacyName: string
  contactName: string
  email: string
  phone: string
  city: string
  postalCode: string
  lgo: string
  boxesPerDay: string
  reserveArea: string
  teamSize: string
  needs: string[]
  timeframe: string
  details: string
  website: string
}

export type RequestState = {
  ok: boolean
  message: string
  errors?: Record<string, string>
}

const allowedLgo = new Set([
  'WINPHARMA',
  'LGPI',
  'LEO',
  'PHARMALAND',
  'PHARMONY',
  'SMART RX',
  'Autre',
  'Non renseigné',
])
const allowedBoxes = new Set([
  'Moins de 500',
  '500 à 1 500',
  '1 500 à 3 000',
  'Plus de 3 000',
  'Non renseigné',
])
const allowedTimeframes = new Set([
  'Dès que possible',
  'Sous 3 mois',
  'Sous 6 mois',
  'Cette année',
  'Projet exploratoire',
])

const clean = (value: string, max: number) => value.trim().slice(0, max)

export function prepareRequestEmail(
  form: RequestFormData,
  valueSummary: string[],
): { state: RequestState; mailto?: string } {
  if (clean(form.website, 200)) {
    return { state: { ok: true, message: 'Votre demande est prête.' } }
  }

  const data = {
    ...form,
    pharmacyName: clean(form.pharmacyName, 120),
    contactName: clean(form.contactName, 120),
    email: clean(form.email, 180).toLowerCase(),
    phone: clean(form.phone, 30),
    city: clean(form.city, 100),
    postalCode: clean(form.postalCode, 10),
    reserveArea: clean(form.reserveArea, 50),
    teamSize: clean(form.teamSize, 50),
    details: clean(form.details, 3000),
  }
  const errors: Record<string, string> = {}
  if (data.pharmacyName.length < 2) errors.pharmacyName = 'Indiquez le nom de la pharmacie.'
  if (data.contactName.length < 2) errors.contactName = 'Indiquez votre nom.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Indiquez un e-mail valide.'
  if (data.phone.length < 6) errors.phone = 'Indiquez un numéro de téléphone.'
  if (data.city.length < 2) errors.city = 'Indiquez la ville.'
  if (!/^[0-9A-Za-z -]{3,10}$/.test(data.postalCode))
    errors.postalCode = 'Indiquez un code postal valide.'
  if (!allowedLgo.has(data.lgo)) errors.lgo = 'Sélectionnez votre LGO.'
  if (!allowedBoxes.has(data.boxesPerDay)) errors.boxesPerDay = 'Sélectionnez un volume.'
  if (!allowedTimeframes.has(data.timeframe)) errors.timeframe = 'Sélectionnez une échéance.'
  if (!data.needs.length) errors.needs = 'Sélectionnez au moins un besoin.'

  if (Object.keys(errors).length) {
    return {
      state: { ok: false, message: 'Vérifiez les informations indiquées.', errors },
    }
  }

  const body = [
    'Bonjour PHARLOG,',
    '',
    'Je souhaite être recontacté au sujet de mon projet logistique.',
    '',
    `Pharmacie : ${data.pharmacyName}`,
    `Contact : ${data.contactName}`,
    `E-mail : ${data.email}`,
    `Téléphone : ${data.phone}`,
    `Ville : ${data.postalCode} ${data.city}`,
    `LGO : ${data.lgo}`,
    `Volume : ${data.boxesPerDay}`,
    `Surface de réserve : ${data.reserveArea || 'Non renseignée'}`,
    `Taille de l’équipe : ${data.teamSize || 'Non renseignée'}`,
    `Besoins : ${data.needs.join(', ')}`,
    `Échéance : ${data.timeframe}`,
    '',
    'Contexte et objectifs :',
    data.details || 'Non renseignés',
    '',
    'Valeur ajoutée identifiée :',
    valueSummary.join('\n'),
  ].join('\n')

  return {
    state: {
      ok: true,
      message:
        'Votre messagerie va s’ouvrir avec une demande préremplie. Vérifiez-la puis envoyez-la à PHARLOG.',
    },
    mailto: `mailto:contact@pharlog.fr?subject=${encodeURIComponent(`Demande sur mesure — ${data.pharmacyName}`)}&body=${encodeURIComponent(body)}`,
  }
}
