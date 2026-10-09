import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostPage } from '@/components/blog-post-page'
import { blogSlugs, getBlogPost } from '@/lib/blog-posts'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'Article not found | Kavach Consultancy' }

  return {
    title: `${post.en.title} | Kavach Consultancy Journal`,
    description: post.en.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      title: post.en.title,
      description: post.en.excerpt,
      type: 'article',
      images: [{ url: post.image, alt: post.en.imageAlt }],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  if (!getBlogPost(slug)) notFound()
  return <BlogPostPage slug={slug} />
}
