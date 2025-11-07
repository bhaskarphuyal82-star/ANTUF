import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";
import Script from "next/script";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: 'All Nepal Federation of Trade Unions(ANTUF)',
    template: 'All Nepal Federation of Trade Unions(ANTUF)'
  },
  description: 'A modern learning management system',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'All Nepal Federation of Trade Unions(ANTUF)',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'All Nepal Federation of Trade Unions(ANTUF)'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Nepal Federation of Trade Unions(ANTUF)',
    description: 'A modern learning management system',
    images: ['/images/og-image.jpg']
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  // const structuredData = {
  //   "@context": "https://schema.org",
  //   "@type": "EducationalOrganization",
  //   "name": "TutorialsMaterial",
  //   "description": "Comprehensive programming tutorials and courses",
  //   "url": "https://tutorialsmaterial.com",
  //   "logo": "https://tutorialsmaterial.com/images/logo2.png",
  //   "sameAs": [
  //     "https://twitter.com/tutorialsmaterial"
  //   ],
  //   "hasOfferCatalog": {
  //     "@type": "OfferCatalog",
  //     "name": "Programming Courses",
  //     "itemListElement": [
  //       {
  //         "@type": "Course",
  //         "name": "Web Development",
  //         "description": "Learn modern web development technologies"
  //       },
  //       {
  //         "@type": "Course", 
  //         "name": "Programming Languages",
  //         "description": "Master popular programming languages"
  //       }
  //     ]
  //   }
  // };

  return (
    <html lang="en">

      <body cz-shortcut-listen="true">
        <ClientProvider>
          {children}
          <ToastContainer />
        </ClientProvider>
      </body>
    </html>
  );
}
