import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import { BodyCustomCode, renderHeadCustomCode } from '@/lib/make-custom-code'
import { makeSiteSettings, sanitizeHtmlAttribute } from '@/lib/make-site-settings'
import './styles.css'

const defaultTitle = 'PHARLOG — WMS et logistique officinale'
const title = makeSiteSettings.title ?? defaultTitle
const description =
  makeSiteSettings.description ??
  "PHARLOG accompagne les pharmacies avec le WMS GCO, l'audit de dépôt, la formation et les équipements logistiques."
const favicon = makeSiteSettings.icons?.icon ?? '/pharlog-logo.png'
const socialImage = makeSiteSettings.openGraph?.image
const googleAnalyticsId = sanitizeHtmlAttribute(makeSiteSettings.analytics?.googleAnalyticsId)

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: title,
    template: '%s',
  },
  description,
  robots: makeSiteSettings.robots?.index === false ? { follow: false, index: false } : undefined,
  icons: favicon ? { icon: favicon } : undefined,
  openGraph: {
    title,
    description,
    locale: 'fr_FR',
    siteName: 'PHARLOG',
    images: socialImage ? [socialImage] : ['/images/depot-pharmacie.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    images: socialImage ? [socialImage] : ['/images/depot-pharmacie.webp'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const language = sanitizeHtmlAttribute(makeSiteSettings.language) || 'fr'
  const addBypassLinks = makeSiteSettings.accessibility?.addBypassLinks === true
  const customScripts = makeSiteSettings.customScripts

  return (
    <html lang={language}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('pharlog-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
        {renderHeadCustomCode(customScripts?.headStart, 'head-start')}
        {renderHeadCustomCode(customScripts?.headEnd, 'head-end')}
      </head>
      <body className="min-h-screen bg-white text-zinc-950 antialiased">
        <BodyCustomCode html={customScripts?.bodyStart} />
        {addBypassLinks && (
          <a className="figma-bypass-link" href="#root">
            Aller au contenu
          </a>
        )}
        <div id="root" tabIndex={-1}>
          {children}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['Organization', 'LocalBusiness'],
                  '@id': 'https://pharlog.fr/#organization',
                  name: 'PHARLOG',
                  url: 'https://pharlog.fr',
                  logo: 'https://pharlog.fr/pharlog-logo.png',
                  email: 'contact@pharlog.fr',
                  description:
                    "WMS GCO, audit de dépôt, formation et équipements pour la logistique des pharmacies d'officine.",
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Maison 8 La Borlière, 53 rue Soldat Ferrari',
                    postalCode: '83400',
                    addressLocality: 'Hyères',
                    addressCountry: 'FR',
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://pharlog.fr/#website',
                  url: 'https://pharlog.fr',
                  name: 'PHARLOG',
                  inLanguage: 'fr-FR',
                  publisher: { '@id': 'https://pharlog.fr/#organization' },
                },
              ],
            }),
          }}
        />
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="figma-google-analytics" strategy="afterInteractive">
              {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(googleAnalyticsId)});
`}
            </Script>
          </>
        )}
        <BodyCustomCode html={customScripts?.bodyEnd} />
      </body>
    </html>
  )
}
