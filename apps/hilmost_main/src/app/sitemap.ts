import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@utilitiessite/config';
import { getAllApps } from '@/content/apps';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hilmost.net';
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/healthhub`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    }
  ];

  const apps = getAllApps();
  const appsPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/apps`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...apps.map(app => ({
      url: `${baseUrl}/apps/${app.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  return [...staticPages, ...appsPages, ...blogPages];
}
