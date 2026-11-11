'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import type { PharmacyRequest } from '@/payload-types'

export type RequestState = { ok: boolean; message: string; errors?: Record<string, string> }

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
const allowedNeeds = new Set([
  'Réorganiser le dépôt',
  'Déployer le WMS GCO',
  'Connecter le LGO',
  'Fiabiliser la réception',
  'Automatiser le réassort',
  'Équiper le dépôt',
  'Former les équipes',
  'Créer une mezzanine ou des rayonnages',
])

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

export async function submitPharmacyRequest(input: unknown): Promise<RequestState> {
  if (!input || typeof input !== 'object') return { ok: false, message: 'La demande est invalide.' }
  const body = input as Record<string, unknown>
  if (clean(body.website, 200)) return { ok: true, message: 'Votre demande a bien été transmise.' }

  const data = {
    pharmacyName: clean(body.pharmacyName, 120),
    contactName: clean(body.contactName, 120),
    email: clean(body.email, 180).toLowerCase(),
    phone: clean(body.phone, 30),
    city: clean(body.city, 100),
    postalCode: clean(body.postalCode, 10),
    lgo: clean(body.lgo, 30) as PharmacyRequest['lgo'],
    boxesPerDay: clean(body.boxesPerDay, 30) as PharmacyRequest['boxesPerDay'],
    reserveArea: clean(body.reserveArea, 50),
    teamSize: clean(body.teamSize, 50),
    needs: (Array.isArray(body.needs)
      ? body.needs
          .filter((item): item is string => typeof item === 'string' && allowedNeeds.has(item))
          .slice(0, 8)
      : []) as PharmacyRequest['needs'],
    timeframe: clean(body.timeframe, 30) as PharmacyRequest['timeframe'],
    details: clean(body.details, 3000),
    valueSummary: clean(body.valueSummary, 2000),
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
  if (Object.keys(errors).length)
    return { ok: false, message: 'Vérifiez les informations indiquées.', errors }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'pharmacy-requests',
      data,
      overrideAccess: false,
    })
    return {
      ok: true,
      message:
        'Merci. Votre demande sur mesure a été enregistrée. Un expert PHARLOG reviendra vers vous sous 48 h.',
    }
  } catch {
    return {
      ok: false,
      message: 'La demande n’a pas pu être enregistrée. Réessayez ou écrivez à contact@pharlog.fr.',
    }
  }
}
