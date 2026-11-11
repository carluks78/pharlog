'use client'

import { useMemo, useState, useTransition } from 'react'
import { submitPharmacyRequest, type RequestState } from '../actions'

const needs = [
  'Réorganiser le dépôt',
  'Déployer le WMS GCO',
  'Connecter le LGO',
  'Fiabiliser la réception',
  'Automatiser le réassort',
  'Équiper le dépôt',
  'Former les équipes',
  'Créer une mezzanine ou des rayonnages',
]
const benefits: Record<string, string> = {
  'Réorganiser le dépôt': 'Réduire le temps de recherche grâce à des zones cartographiées.',
  'Déployer le WMS GCO': 'Piloter les stocks et les flux avec un outil pensé pour l’officine.',
  'Connecter le LGO': 'Synchroniser les mouvements sans remplacer votre logiciel de gestion.',
  'Fiabiliser la réception': 'Contrôler les colis par scan et tracer immédiatement le rangement.',
  'Automatiser le réassort': 'Limiter les ruptures en rayon et prioriser les réapprovisionnements.',
  'Équiper le dépôt': 'Adapter cartobacs, bacs, imprimantes et rayonnages à votre espace.',
  'Former les équipes':
    'Partager des processus fiables qui ne dépendent plus d’une seule personne.',
  'Créer une mezzanine ou des rayonnages':
    'Augmenter la capacité utile et fluidifier la circulation.',
}
const initial = {
  pharmacyName: '',
  contactName: '',
  email: '',
  phone: '',
  city: '',
  postalCode: '',
  lgo: '',
  boxesPerDay: '',
  reserveArea: '',
  teamSize: '',
  needs: [] as string[],
  timeframe: '',
  details: '',
  website: '',
}

export function RequestForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initial)
  const [result, setResult] = useState<RequestState | null>(null)
  const [pending, startTransition] = useTransition()
  const value = useMemo(() => form.needs.map((need) => benefits[need]), [form.needs])
  const update = (name: string, value: string) =>
    setForm((current) => ({ ...current, [name]: value }))
  const toggleNeed = (need: string) =>
    setForm((current) => ({
      ...current,
      needs: current.needs.includes(need)
        ? current.needs.filter((item) => item !== need)
        : [...current.needs, need],
    }))
  function submit() {
    setResult(null)
    startTransition(async () => {
      const response = await submitPharmacyRequest({ ...form, valueSummary: value.join('\n') })
      setResult(response)
      if (response.ok) setStep(4)
    })
  }
  if (step === 4 && result?.ok)
    return (
      <div className="rounded-3xl bg-emerald-50 p-8 text-center sm:p-12">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-2xl font-bold text-white">
          ✓
        </span>
        <h2 className="mt-5 font-display text-2xl font-extrabold text-emerald-950">
          Demande enregistrée
        </h2>
        <p className="mx-auto mt-3 max-w-lg leading-relaxed text-emerald-800">{result.message}</p>
      </div>
    )
  return (
    <div className="rounded-3xl border border-violet-950/10 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(48,16,111,.5)] sm:p-8">
      <div className="mb-8 flex gap-2">
        {[1, 2, 3].map((item) => (
          <span
            key={item}
            className={`h-1.5 flex-1 rounded-full ${item <= step ? 'bg-[#5b21c4]' : 'bg-violet-100'}`}
          />
        ))}
      </div>
      {step === 1 && (
        <div>
          <h2 className="font-display text-2xl font-extrabold">Votre officine</h2>
          <p className="mt-2 text-sm text-[#6e6a7a]">
            Les informations essentielles pour contextualiser votre demande.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Nom de la pharmacie" error={result?.errors?.pharmacyName}>
              <input
                value={form.pharmacyName}
                onChange={(e) => update('pharmacyName', e.target.value)}
              />
            </Field>
            <Field label="Nom du contact" error={result?.errors?.contactName}>
              <input
                value={form.contactName}
                onChange={(e) => update('contactName', e.target.value)}
              />
            </Field>
            <Field label="E-mail" error={result?.errors?.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
              />
            </Field>
            <Field label="Téléphone" error={result?.errors?.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
              />
            </Field>
            <Field label="Ville" error={result?.errors?.city}>
              <input value={form.city} onChange={(e) => update('city', e.target.value)} />
            </Field>
            <Field label="Code postal" error={result?.errors?.postalCode}>
              <input
                value={form.postalCode}
                onChange={(e) => update('postalCode', e.target.value)}
              />
            </Field>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="font-display text-2xl font-extrabold">Votre configuration</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="LGO actuel">
              <Select
                value={form.lgo}
                onChange={(v) => update('lgo', v)}
                options={[
                  'WINPHARMA',
                  'LGPI',
                  'LEO',
                  'PHARMALAND',
                  'PHARMONY',
                  'SMART RX',
                  'Autre',
                  'Non renseigné',
                ]}
              />
            </Field>
            <Field label="Boîtes traitées par jour">
              <Select
                value={form.boxesPerDay}
                onChange={(v) => update('boxesPerDay', v)}
                options={[
                  'Moins de 500',
                  '500 à 1 500',
                  '1 500 à 3 000',
                  'Plus de 3 000',
                  'Non renseigné',
                ]}
              />
            </Field>
            <Field label="Surface de réserve (facultatif)">
              <input
                value={form.reserveArea}
                onChange={(e) => update('reserveArea', e.target.value)}
                placeholder="Ex. 120 m²"
              />
            </Field>
            <Field label="Taille de l’équipe (facultatif)">
              <input
                value={form.teamSize}
                onChange={(e) => update('teamSize', e.target.value)}
                placeholder="Ex. 12 personnes"
              />
            </Field>
          </div>
          <h3 className="mt-7 font-bold">Vos besoins</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {needs.map((need) => (
              <button
                type="button"
                key={need}
                onClick={() => toggleNeed(need)}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold ${form.needs.includes(need) ? 'border-[#5b21c4] bg-violet-50 text-[#5b21c4]' : 'border-violet-950/10'}`}
              >
                {form.needs.includes(need) ? '✓ ' : ''}
                {need}
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className="font-display text-2xl font-extrabold">Objectifs et valeur ajoutée</h2>
          <div className="mt-6 grid gap-5">
            <Field label="Échéance souhaitée">
              <Select
                value={form.timeframe}
                onChange={(v) => update('timeframe', v)}
                options={[
                  'Dès que possible',
                  'Sous 3 mois',
                  'Sous 6 mois',
                  'Cette année',
                  'Projet exploratoire',
                ]}
              />
            </Field>
            <Field label="Contexte et objectifs">
              <textarea
                rows={5}
                value={form.details}
                onChange={(e) => update('details', e.target.value)}
                placeholder="Décrivez les difficultés actuelles et le résultat attendu…"
              />
            </Field>
            <div className="rounded-2xl bg-[#eaf9fa] p-5">
              <h3 className="font-display font-extrabold text-[#123b3f]">
                Valeur ajoutée potentielle pour votre officine
              </h3>
              {value.length ? (
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#315b5f]">
                  {value.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-[#315b5f]">
                  Sélectionnez vos besoins à l’étape précédente.
                </p>
              )}
            </div>
            <label className="sr-only">
              Ne pas remplir
              <input
                value={form.website}
                onChange={(e) => update('website', e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>
        </div>
      )}
      {result && !result.ok && (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-800"
        >
          {result.message}
        </p>
      )}
      <div className="mt-8 flex justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="rounded-full border border-violet-950/15 px-5 py-3 font-bold"
          >
            Retour
          </button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="rounded-full bg-[#5b21c4] px-6 py-3 font-bold text-white"
          >
            Continuer
          </button>
        ) : (
          <button
            type="button"
            disabled={pending}
            onClick={submit}
            className="rounded-full bg-[#5b21c4] px-6 py-3 font-bold text-white disabled:opacity-60"
          >
            {pending ? 'Envoi…' : 'Envoyer ma demande'}
          </button>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      {children}
      {error && <span className="text-xs text-red-700">{error}</span>}
    </label>
  )
}
function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Sélectionner</option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  )
}
