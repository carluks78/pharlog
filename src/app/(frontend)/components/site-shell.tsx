import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { navigation } from '../site-data'
import { Chatbot } from './chatbot'
import { Header } from './header'

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer className="bg-[#181529] px-5 pb-8 pt-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image src="/pharlog-logo.webp" alt="" width={58} height={58} />
              <span className="font-display text-lg font-extrabold tracking-[.12em]">PHARLOG</span>
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-zinc-400">
              Le dépôt de votre pharmacie, piloté comme un vrai dépôt logistique.
            </p>
          </div>
          <div>
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[.16em] text-zinc-500">
              Plan du site
            </h2>
            <div className="grid gap-2 text-sm text-zinc-300">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-sm text-zinc-300">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[.16em] text-zinc-500">
              Coordonnées
            </h2>
            <p>
              Maison 8 La Borlière
              <br />
              53 rue Soldat Ferrari
              <br />
              83400 Hyères
            </p>
            <a href="mailto:contact@pharlog.fr" className="mt-4 block text-cyan-300">
              contact@pharlog.fr
            </a>
            <p className="mt-4 text-zinc-500">Téléphone et horaires : [À COMPLÉTER]</p>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-[1380px] flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row">
          <span>© PHARLOG — Expert en logistique officinale</span>
          <span className="flex gap-4">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/rgpd">RGPD</Link>
            <Link href="/cgv">CGV</Link>
          </span>
        </div>
      </footer>
      <Chatbot />
    </>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-extrabold uppercase tracking-[.16em] text-[#5b21c4]">
      {children}
    </p>
  )
}

export function CTA({
  href,
  children,
  light = false,
}: {
  href: string
  children: ReactNode
  light?: boolean
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-bold transition hover:-translate-y-0.5 ${light ? 'border border-violet-950/15 bg-white text-[#181529] hover:text-[#5b21c4]' : 'bg-[#5b21c4] text-white hover:bg-[#49189f]'}`}
    >
      {children}
      <span aria-hidden className="ml-2">
        →
      </span>
    </Link>
  )
}

export function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string
  title: string
  text: string
  image: string
}) {
  return (
    <section className="mx-auto grid max-w-[1480px] items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:px-12 lg:py-20">
      <div>
        <div className="mb-8 text-xs text-[#6e6a7a]">
          <Link href="/">Accueil</Link> <span className="mx-2">/</span> {eyebrow}
        </div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display text-4xl font-extrabold leading-[1.04] tracking-[-.05em] text-[#181529] sm:text-5xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#6e6a7a] sm:text-lg">{text}</p>
      </div>
      <Image
        src={`/images/${image}`}
        alt={`${title} — PHARLOG`}
        width={1800}
        height={875}
        priority
        className="h-[300px] w-full rounded-[24px_24px_80px_24px] object-cover sm:h-[400px] lg:h-[470px]"
      />
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow: string
  title: string
  text?: string
  center?: boolean
}) {
  return (
    <div className={`mb-10 max-w-3xl sm:mb-14 ${center ? 'mx-auto text-center' : ''}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-3xl font-extrabold leading-tight tracking-[-.04em] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-5 text-base leading-relaxed text-[#6e6a7a] sm:text-lg">{text}</p>}
    </div>
  )
}

export function ContactBand() {
  return (
    <section className="bg-[#5b21c4] px-5 py-14 text-white sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-cyan-200">
            Votre officine, votre configuration
          </p>
          <h2 className="font-display text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">
            Recevez une recommandation sur mesure
          </h2>
          <p className="mt-4 text-violet-100">
            Décrivez votre dépôt, votre LGO et vos priorités. Un expert PHARLOG revient vers vous
            sous 48 h.
          </p>
        </div>
        <CTA href="/contact" light>
          Décrire mon projet
        </CTA>
      </div>
    </section>
  )
}
