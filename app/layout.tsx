import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { siteConfig } from "@/config/site";
import Header from '@/components/header';

const font = Inter({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Developer',
    'Fullstack',
    'Frontend',
    'Backend',
  ],
  authors: [
    {
      name: 'Raphael Andrews',
      url: 'https://ndrws.dev'
    }
  ],
  creator: 'Raphael Andrews',
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og.jpg`,
        width: 1200,
        height: 300,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
