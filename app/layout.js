import { Syncopate } from 'next/font/google';
import "./globals.css";
import { getProfile } from "@/lib/getData";

// 1. INITIALIZE THE FONT HERE (Just below your imports)
const syncopate = Syncopate({ 
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-syncopate',
});

export async function generateMetadata() {
  try {
    const profile = await getProfile();
    return {
      title: profile.seoTitle || `${profile.name} — ${profile.role}`,
      description: profile.seoDescription || profile.bio,
      openGraph: {
        title: profile.seoTitle || profile.name,
        description: profile.seoDescription || profile.bio,
        images: profile.ogImage ? [profile.ogImage] : [],
      },
    };
  } catch {
    return { title: "Portfolio" };
  }
}

export default function RootLayout({ children }) {
  return (
    // 2. ATTACH THE FONT VARIABLE TO YOUR HTML TAG
    <html lang="en" className={syncopate.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
      </head>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}