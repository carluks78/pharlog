import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ContactBand, CTA, Eyebrow, SectionHeading, SiteShell } from './components/site-shell'

export const metadata: Metadata = {
  title: 'PHARLOG — WMS et logistique officinale à Hyères',
  description:
    'PHARLOG transforme le dépôt de votre pharmacie en espace logistique piloté : WMS GCO, audit, formation et équipements.',
  alternates: { canonical: '/' },
}

const gateways = [
  [
    '01',
    'Solution WMS',
    'Cartographie, réception scannée, préparation guidée et réassort automatisé.',
    '/solution-wms',
  ],
  [
    '02',
    'Compatibilité LGO',
    'Une connexion à votre logiciel actuel, sans changer les habitudes métier.',
    '/compatibilite-lgo',
  ],
  [
    '03',
    'Accompagnement',
    'Un déploiement terrain de l’audit à l’optimisation continue.',
    '/accompagnement',
  ],
  [
    '04',
    'Fournitures',
    'Rayonnages, cartobacs, bacs navettes et impression d’étiquettes.',
    '/fournitures',
  ],
  [
    '05',
    'Réalisations',
    'Des dépôts réels réorganisés pour fluidifier chaque mouvement.',
    '/realisations',
  ],
  [
    '06',
    'Actualités',
    'Conseils pratiques pour anticiper les enjeux de l’officine.',
    '/actualites',
  ],
] as const

export default function HomePage() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-[1480px] items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
        <div>
          <Eyebrow>WMS & logistique officinale</Eyebrow>
          <h1 className="font-display text-4xl font-extrabold leading-[1.02] tracking-[-.055em] text-[#181529] sm:text-6xl lg:text-7xl">
            Votre dépôt, piloté comme{' '}
            <span className="text-[#5b21c4]">un vrai espace logistique.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#6e6a7a] sm:text-lg">
            PHARLOG connecte le WMS GCO à votre LGO pour structurer la réception, le rangement, la
            préparation et le réassort de votre pharmacie.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTA href="/contact">Obtenir une étude sur mesure</CTA>
            <CTA href="/solution-wms" light>
              Découvrir le WMS
            </CTA>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#403d4d]">
            <li>+15 ans d’expérience officinale</li>
            <li>+10 ans de déploiement WMS</li>
            <li>Compatible tous LGO</li>
          </ul>
        </div>
        <div className="relative">
          <Image
            src="/images/depot-pharmacie.webp"
            alt="Dépôt de pharmacie organisé et piloté avec PHARLOG"
            width={1800}
            height={875}
            priority
            className="h-[350px] w-full rounded-[24px_24px_100px_24px] object-cover sm:h-[500px] lg:h-[620px]"
          />
          <div className="absolute bottom-5 left-4 rounded-2xl bg-[#17b8c9] p-5 text-[#092f34] shadow-xl sm:-left-6 sm:bottom-8">
            <b className="font-display text-3xl font-extrabold">98 %</b>
            <p className="text-xs font-bold">
              de remplissage
              <br />
              après WMS
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#181529] px-5 py-14 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1380px]">
          <SectionHeading
            eyebrow="Choisissez votre sujet"
            title="Une page dédiée à chaque besoin de votre officine"
            text="L’accueil vous oriente. Chaque rubrique détaille ensuite la solution, la méthode ou les équipements concernés."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gateways.map(([number, title, text, href]) => (
              <Link
                key={href}
                href={href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
              >
                <span className="text-xs font-extrabold text-cyan-300">{number}</span>
                <h2 className="mt-10 font-display text-xl font-extrabold">{title}</h2>
                <p className="mt-3 leading-relaxed text-zinc-400">{text}</p>
                <span className="mt-6 inline-block font-bold text-cyan-200">Voir la page →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1380px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['100 K', 'boîtes mises en rayon par jour'],
            ['120 K', 'boîtes réceptionnées en moyenne'],
            ['15 K', 'références en réserve géolocalisées'],
            ['+23 %', 'de taux de remplissage après WMS'],
          ].map(([value, label]) => (
            <div key={value} className="rounded-2xl border border-violet-950/10 p-6">
              <b className="font-display text-4xl font-extrabold text-[#5b21c4]">{value}</b>
              <p className="mt-2 text-sm leading-relaxed text-[#6e6a7a]">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <ContactBand />
    </SiteShell>
  )
}
