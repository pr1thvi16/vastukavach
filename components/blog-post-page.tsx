'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language'
import { StandardPage } from '@/components/page-shared'
import { btn } from '@/components/site-shell'
import { getBlogPost } from '@/lib/blog-posts'

export function BlogPostPage({ slug }: { slug: string }) {
  const { language, t } = useLanguage()
  const post = getBlogPost(slug)
  if (!post) return null
  const content = post[language]

  return <StandardPage eyebrow="From the journal" title={content.title} image={post.image} imageAlt={content.imageAlt}>
    <article className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2a1b1f]/15 pb-5 text-xs text-[#2a1b1f]/70">
        <span>{t('Practical perspective')} · {post.readingMinutes} {t('min read')}</span>
        <Link href="/blogs" className="inline-flex items-center gap-2 text-[#74512f] underline underline-offset-4 hover:text-[#3b1220]">
          <ArrowLeft className="size-4" />{t('Back to journal')}
        </Link>
      </div>
      <p className="mt-8 font-serif text-2xl font-light leading-relaxed text-[#2a1b1f]/90 sm:text-3xl">{content.intro}</p>
      <div className="mt-10 space-y-10">
        {content.sections.map((section) => <section key={section.heading} className="border-t border-[#2a1b1f]/15 pt-7">
          <h2 className="font-serif text-3xl font-light leading-tight text-[#3b1220] sm:text-4xl">{section.heading}</h2>
          <div className="mt-5 space-y-5 text-base leading-8 text-[#2a1b1f]/80">
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>)}
      </div>
      <aside className="mt-14 rounded-2xl bg-[#3b1220] p-7 text-[#f6f1ea] sm:p-10">
        <p className="text-[11px] uppercase tracking-[.2em] text-[#d9bf9a]">{t('A helpful next step')}</p>
        <h2 className="mt-4 max-w-xl font-serif text-3xl font-light leading-tight sm:text-4xl">{t('Have a space or question you would like to talk through?')}</h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">{t('Share what you are considering and we will help you find a practical place to start. No pressure to have every answer ready.')}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/bookings" className={`${btn} bg-[#d9bf9a] text-[#3b1220] hover:bg-white`}>{t('Talk it through with us')} <ArrowUpRight className="size-4" /></Link>
          <Link href="/services" className={`${btn} border border-white/35 text-white hover:bg-white hover:text-[#3b1220]`}>{t('Explore our services')}</Link>
        </div>
      </aside>
    </article>
  </StandardPage>
}
