export const BASE_OPEN_GRAPH = {
  siteName: "Hilmost",
  type: "website",
  images: [
    {
      url: "https://hilmost.net/og-home.png",
      width: 1200,
      height: 630,
      alt: "Hilmost | Engineering the Everyday Utility",
    },
  ],
};

export function pageMeta(path: string, title: string, description: string) {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      ...BASE_OPEN_GRAPH,
      url: path,
      title,
      description,
    },
  };
}
