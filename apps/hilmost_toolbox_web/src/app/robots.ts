import { MetadataRoute } from 'next';

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/cdn-cgi/',
          '/*?val1=*',
          '/*?unit1=*',
          '/*?val2=*',
          '/*?unit2=*',
        ],
      },
    ],
    sitemap: 'https://hilmost-toolbox.hilmost.net/sitemap.xml',
  };
}
