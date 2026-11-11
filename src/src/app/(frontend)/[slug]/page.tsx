import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RequestForm } from '../components/request-form'
import { ContactBand, CTA, PageHero, SectionHeading, SiteShell } from '../components/site-shell'
import { articles, deploymentSteps, features, gallery, lgos, pageSeo } from '../site-data'

const slugs = [
  'qui-sommes-nous',
  'solution-wms',
  'compatibilite-lgo',
  'accompagnement',
  'fournitures',
  'realisations',
  'actualites',
  'contact',
  'mentions-legales',
  'rgpd',
  'cgv',
]
export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const seo = pageSeo[slug]
  if (seo)
    return {
      title: seo.title,
      description: seo.description,
      alternates: { canonical: `/${slug}` },
      openGraph: { title: seo.title, description: seo.description },
    }
  return { title: `${legalTitle(slug)} | PHARLOG`, alternates: { canonical: `/${slug}` } }
}

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!slugs.includes(slug)) notFound()
  if (slug === 'qui-sommes-nous') return <About />
  if (slug === 'solution-wms') return <Solution />
  if (slug === 'compatibilite-lgo') return <Compatibility />
  if (slug === 'accompagnement') return <Accompaniment />
  if (slug === 'fournitures') return <Supplies />
  if (slug === 'realisations') return <Realisations />
  if (slug === 'actualites') return <News />
  if (slug === 'contact') return <Contact />
  return <Legal slug={slug} />
}

function About() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Qui sommes-nous ?"
        title="L’expertise logistique au service de la pharmacie"
        text="PHARLOG accompagne grossistes et officines dans la mise en place de solutions complètes de gestion de dépôt."
        image="mezzanine-stockage.webp"
      />
      <section className="mx-auto grid max-w-[1250px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-24">
        <div>
          <SectionHeading eyebrow="Notre mission" title="Un environnement de stockage optimal" />
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-[#5e5a68]">
          <p>
            L’optimisation de l’espace, l’efficacité des flux et la maîtrise des outils de gestion
            sont cruciales pour votre activité.
          </p>
          <p>
            Notre objectif est de fournir un environnement de stockage optimal et de former vos
            équipes pour exploiter tout le potentiel du WMS GCO.
          </p>
          <h2 className="pt-5 font-display text-3xl font-extrabold text-[#181529]">
            Cédric Marmouget, fondateur
          </h2>
          <p>
            Après des études en logistique, Cédric a travaillé dans la plus grande gare de triage
            d’Europe puis orchestré la logistique de monguidesante.com.
          </p>
          <p>
            Face à la demande des pharmacies, il fonde PHARLOG, d’abord autour de la formation
            logistique, puis acquiert GCO pour optimiser les stocks et dépôts pharmaceutiques.
          </p>
        </div>
      </section>
      <ContactBand />
    </SiteShell>
  )
}
function Solution() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Solution WMS"
        title="Un WMS pensé pour la réalité du dépôt d’officine"
        text="Chaque fonctionnalité répond à un besoin observé dans de vrais dépôts pharmaceutiques."
        image="depot-pharmacie.webp"
      />
      <section className="bg-[#f7f7fb] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1380px]">
          <SectionHeading eyebrow="6 fonctionnalités" title="De la réception au rayon" />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, text], index) => (
              <article key={title} className="rounded-2xl border border-violet-950/10 bg-white p-7">
                <span className="text-xs font-extrabold text-[#17b8c9]">0{index + 1}</span>
                <h2 className="mt-12 font-display text-xl font-extrabold">{title}</h2>
                <p className="mt-3 leading-relaxed text-[#6e6a7a]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Le WMS PHARLOG en réponses courtes"
            text="Des réponses directement exploitables par les titulaires, leurs équipes et les moteurs de recherche."
          />
          <div className="space-y-3">
            {[
              [
                'Faut-il changer de LGO pour utiliser PHARLOG ?',
                'Non. PHARLOG connecte le WMS GCO au LGO déjà utilisé par l’officine sans le modifier.',
              ],
              [
                'Que pilote le WMS GCO dans une pharmacie ?',
                'Il pilote la cartographie des zones, la réception scannée, la préparation par PDA, la traçabilité et le réassort rayon.',
              ],
              [
                'Comment se déroule le déploiement ?',
                'PHARLOG réalise un audit, paramètre le WMS, forme les équipes sur site puis assure le suivi et l’optimisation.',
              ],
            ].map(([question, answer]) => (
              <details
                key={question}
                className="rounded-2xl border border-violet-950/10 p-5 open:bg-violet-50"
              >
                <summary className="cursor-pointer font-display font-extrabold">{question}</summary>
                <p className="mt-3 leading-relaxed text-[#5e5a68]">{answer}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Faut-il changer de LGO pour utiliser PHARLOG ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Non. PHARLOG connecte le WMS GCO au LGO déjà utilisé par l’officine sans le modifier.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Que pilote le WMS GCO dans une pharmacie ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Il pilote la cartographie des zones, la réception scannée, la préparation par PDA, la traçabilité et le réassort rayon.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Comment se déroule le déploiement PHARLOG ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'PHARLOG réalise un audit, paramètre le WMS, forme les équipes sur site puis assure le suivi et l’optimisation.',
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>
      <ContactBand />
    </SiteShell>
  )
}
function Compatibility() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Compatibilité LGO"
        title="Gardez votre logiciel de gestion actuel"
        text="PHARLOG s’interface avec votre LGO sans le modifier pour synchroniser stocks, commandes et mouvements."
        image="references-etiquetees.webp"
      />
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading
            eyebrow="Connexion transparente"
            title="Compatible avec les principaux LGO"
            center
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {lgos.map((lgo) => (
              <div
                key={lgo}
                className="grid min-h-32 place-items-center rounded-2xl border border-violet-950/10 font-display text-xl font-extrabold"
              >
                {lgo}
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-violet-50 p-7 text-center">
            <h2 className="font-display text-2xl font-extrabold">Votre LGO n’est pas affiché ?</h2>
            <p className="mt-3 text-[#6e6a7a]">
              La compatibilité publiée par PHARLOG est « tous LGO ». Décrivez votre configuration
              pour la faire valider.
            </p>
            <div className="mt-6">
              <CTA href="/contact">Vérifier ma configuration</CTA>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
function Accompaniment() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Accompagnement"
        title="Un déploiement mené par des experts du terrain"
        text="De l’audit du dépôt à l’optimisation continue, chaque étape est adaptée à votre officine."
        image="reception-palettes.webp"
      />
      <section className="bg-[#30106f] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1380px]">
          <SectionHeading
            eyebrow="Notre méthode"
            title="Quatre étapes pour sécuriser le changement"
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {deploymentSteps.map(([number, title, text]) => (
              <article key={number} className="rounded-2xl border border-white/15 bg-white/5 p-7">
                <span className="text-xs font-bold text-cyan-200">{number}</span>
                <h2 className="mt-12 font-display text-xl font-extrabold">{title}</h2>
                <p className="mt-3 leading-relaxed text-violet-200">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactBand />
    </SiteShell>
  )
}
function Supplies() {
  const products = [
    ['Meubles de stockage', 'Rayonnages et meubles modulables avec bacs et casiers dédiés.'],
    ['Cartobacs', 'Bacs carton à becquet, robustes et empilables pour les petites références.'],
    ['Bacs navettes', 'Bacs à couvercle articulé pour le transport sécurisé entre zones.'],
    ['Bacs de rangement', 'Bacs empilables adaptés à vos meubles et références.'],
    ['Imprimantes d’étiquettes', 'Impression couleur compatible avec le WMS PHARLOG.'],
  ]
  return (
    <SiteShell>
      <PageHero
        eyebrow="Fournitures"
        title="L’équipement de votre dépôt, clé en main"
        text="Le matériel nécessaire pour organiser votre espace de stockage en complément du WMS GCO."
        image="references-etiquetees.webp"
      />
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1380px]">
          <SectionHeading eyebrow="Équipement" title="Une configuration adaptée à votre espace" />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {products.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-violet-950/10 p-7">
                <h2 className="font-display text-xl font-extrabold">{title}</h2>
                <p className="mt-3 leading-relaxed text-[#6e6a7a]">{text}</p>
                <p className="mt-8 text-sm font-bold text-[#5b21c4]">
                  Prix et dimensions : sur demande
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactBand />
    </SiteShell>
  )
}
function Realisations() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Réalisations"
        title="Des dépôts réels, réorganisés par PHARLOG"
        text="Mezzanines, rayonnages, références étiquetées et zones de réception pensées pour fluidifier chaque mouvement."
        image="installation-rayonnages.webp"
      />
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1380px] gap-4 md:grid-cols-2">
          {gallery.map(([image, title, text]) => (
            <figure key={image} className="overflow-hidden rounded-2xl bg-[#f7f7fb]">
              <Image
                src={`/images/${image}`}
                alt={`${title} dans un dépôt de pharmacie PHARLOG`}
                width={1800}
                height={875}
                className="h-64 w-full object-cover sm:h-80"
              />
              <figcaption className="p-6">
                <h2 className="font-display text-xl font-extrabold">{title}</h2>
                <p className="mt-2 text-[#6e6a7a]">{text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <ContactBand />
    </SiteShell>
  )
}
function News() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Le blog PHARLOG"
        title="Actualités logistique et officine"
        text="Conseils, retours d’expérience et enjeux autour de la logistique pharmaceutique."
        image="depot-rayonnages.webp"
      />
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="flex min-h-80 flex-col items-start rounded-2xl border border-violet-950/10 p-7"
            >
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#5b21c4]">
                Article
              </span>
              <h2 className="mt-10 font-display text-2xl font-extrabold">{article.title}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-[#6e6a7a]">{article.description}</p>
              <Link href={`/actualites/${article.slug}`} className="mt-6 font-bold text-[#5b21c4]">
                Lire l’article →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  )
}
function Contact() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Demande sur mesure"
        title="Décrivez votre officine et vos objectifs"
        text="Votre configuration permet d’identifier la valeur ajoutée la plus pertinente avant l’échange avec un expert PHARLOG."
        image="depot-pharmacie.webp"
      />
      <section className="bg-[#f7f7fb] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <SectionHeading
              eyebrow="Diagnostic personnalisé"
              title="Une demande utile dès le premier échange"
              text="Le formulaire précise votre LGO, vos volumes, vos priorités et l’échéance souhaitée."
            />
            <div className="rounded-2xl bg-[#181529] p-6 text-white">
              <h2 className="font-display text-xl font-extrabold">Ce que vous obtenez</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
                <li>• Une qualification claire de vos enjeux</li>
                <li>• Les leviers de valeur associés à vos besoins</li>
                <li>• Un retour d’expert sous 48 h</li>
              </ul>
            </div>
          </div>
          <RequestForm />
        </div>
      </section>
    </SiteShell>
  )
}

function legalTitle(slug: string) {
  return slug === 'mentions-legales'
    ? 'Mentions légales'
    : slug === 'rgpd'
      ? 'Politique de confidentialité (RGPD)'
      : 'Conditions Générales de Vente'
}
function Legal({ slug }: { slug: string }) {
  const title = legalTitle(slug)
  return (
    <SiteShell>
      <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mb-8 text-xs text-[#6e6a7a]">
          <Link href="/">Accueil</Link> / {title}
        </div>
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {slug === 'mentions-legales' ? (
          <>
            <LegalSection title="Éditeur du site">
              <p>
                PHARLOG, SAS au capital de 1 000,00 €<br />
                Maison 8 La Borlière — 53 rue Soldat Ferrari — 83400 Hyères
                <br />
                SIRET : 911 245 488 00018 — RCS Toulon
              </p>
            </LegalSection>
            <LegalSection title="Directeur de la publication">
              <p>Cédric MARMOUGET</p>
            </LegalSection>
            <LegalSection title="Hébergement">
              <p>
                Cloudflare, Inc. — 101 Townsend Street, San Francisco, CA 94107, États-Unis
                <br />
                Téléphone : +1 (650) 319-8930
              </p>
            </LegalSection>
            <LegalSection title="Propriété intellectuelle">
              <p>
                L’ensemble du contenu présent sur ce site est la propriété exclusive de PHARLOG,
                sauf mention contraire. Toute reproduction est interdite sans autorisation écrite
                préalable.
              </p>
            </LegalSection>
          </>
        ) : slug === 'rgpd' ? (
          <>
            <LegalSection title="Responsable du traitement">
              <p>PHARLOG — contact@pharlog.fr</p>
            </LegalSection>
            <LegalSection title="Données collectées">
              <p>
                Les formulaires collectent les coordonnées, informations sur l’officine,
                configuration logistique et objectifs transmis volontairement.
              </p>
            </LegalSection>
            <LegalSection title="Finalités et durée">
              <p>
                Les données servent à répondre aux demandes, assurer le suivi commercial et
                améliorer les services. Elles sont conservées au maximum trois ans après le dernier
                contact en l’absence de relation commerciale.
              </p>
            </LegalSection>
            <LegalSection title="Vos droits">
              <p>
                Vous disposez de droits d’accès, rectification, effacement, limitation, opposition
                et portabilité. Écrivez à contact@pharlog.fr ou saisissez la CNIL.
              </p>
            </LegalSection>
          </>
        ) : (
          <>
            <p className="mt-6 text-[#6e6a7a]">Dernière mise à jour : [À COMPLÉTER]</p>
            {[
              'Objet et champ d’application',
              'Description des offres',
              'Commande et tarifs',
              'Modalités de paiement',
              'Installation et mise en service',
              'Hébergement des données',
              'Obligations du client',
              'Propriété intellectuelle',
              'Maintenance et support',
              'Responsabilité',
              'Résiliation',
              'Confidentialité',
              'Données personnelles',
              'Droit applicable',
            ].map((heading) => (
              <LegalSection key={heading} title={heading}>
                <p>
                  Les modalités applicables sont celles définies dans le devis ou contrat PHARLOG
                  signé avec le client professionnel. Les présentes CGV sont soumises au droit
                  français et tout litige relève des tribunaux du ressort du siège de PHARLOG.
                </p>
              </LegalSection>
            ))}
          </>
        )}
      </article>
    </SiteShell>
  )
}
function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-violet-950/10 pt-8">
      <h2 className="font-display text-2xl font-extrabold">{title}</h2>
      <div className="mt-4 leading-relaxed text-[#5e5a68]">{children}</div>
    </section>
  )
}
