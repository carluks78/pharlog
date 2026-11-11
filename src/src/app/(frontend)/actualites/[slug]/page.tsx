import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContactBand, SiteShell } from '../../components/site-shell'
import { articles } from '../../site-data'

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} | PHARLOG`,
    description: article.description,
    alternates: { canonical: `/actualites/${slug}` },
    openGraph: { type: 'article', title: article.title, description: article.description },
  }
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)
  if (!article) notFound()
  return (
    <SiteShell>
      <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:py-24">
        <div className="mb-8 text-xs text-[#6e6a7a]">
          <Link href="/">Accueil</Link> / <Link href="/actualites">Actualités</Link> / Article
        </div>
        <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#5b21c4]">Article</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-[-.04em] sm:text-5xl lg:text-6xl">
          {article.title}
        </h1>
        <p className="mt-5 text-sm text-[#6e6a7a]">
          Par <b>Cédric Marmouget</b> — Fondateur, PHARLOG
        </p>
        <p className="mt-10 border-l-4 border-[#17b8c9] pl-6 text-xl leading-relaxed text-[#403d4d]">
          {article.intro}
        </p>
        {article.sections.map(([title, text], index) => (
          <section key={title} className="mt-12">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              {index + 1}. {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#5e5a68]">{text}</p>
          </section>
        ))}
        <aside className="mt-16 rounded-2xl bg-violet-50 p-6">
          <h2 className="font-display text-xl font-extrabold">À lire aussi</h2>
          {articles
            .filter((item) => item.slug !== slug)
            .slice(0, 3)
            .map((item) => (
              <Link
                key={item.slug}
                href={`/actualites/${item.slug}`}
                className="mt-4 flex justify-between border-t border-violet-950/10 pt-4 font-bold text-[#5b21c4]"
              >
                {item.title}
                <span>→</span>
              </Link>
            ))}
        </aside>
      </article>
      <ContactBand />
    </SiteShell>
  )
}
