import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";
import Script from "next/script";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: {
    default: "TutorialsMaterial - Learn Programming & Technology",
    template: "%s | TutorialsMaterial"
  },
  description: "Comprehensive programming tutorials and courses. Learn web development, mobile development, data science, and more with hands-on projects and expert guidance.",
  keywords: [
    "programming tutorials",
    "web development",
    "coding courses",
    "learn programming",
    "javascript",
    "python",
    "react",
    "node.js",
    "technology education",
    "software development"
  ],
  authors: [{ name: "TutorialsMaterial" }],
  creator: "TutorialsMaterial",
  publisher: "TutorialsMaterial",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tutorialsmaterial.com",
    siteName: "TutorialsMaterial - Learn Programming",
    title: "TutorialsMaterial - Learn Programming & Technology",
    description: "Comprehensive programming tutorials and courses. Learn web development, mobile development, data science, and more with hands-on projects and expert guidance.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "TutorialsMaterial - Learn Programming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tutorialsmaterial",
    creator: "@tutorialsmaterial",
    title: "TutorialsMaterial - Learn Programming & Technology",
    description: "Comprehensive programming tutorials and courses. Learn web development, mobile development, data science, and more.",
    images: ["/images/twitter-card.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://tutorialsmaterial.com",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "TutorialsMaterial",
    "description": "Comprehensive programming tutorials and courses",
    "url": "https://tutorialsmaterial.com",
    "logo": "https://tutorialsmaterial.com/images/logo2.png",
    "sameAs": [
      "https://twitter.com/tutorialsmaterial"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Programming Courses",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Web Development",
          "description": "Learn modern web development technologies"
        },
        {
          "@type": "Course", 
          "name": "Programming Languages",
          "description": "Master popular programming languages"
        }
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0070f3" />
        <meta name="msapplication-TileColor" content="#0070f3" />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-P5TYWTJP0D"
`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P5TYWTJP0D');
          `}
        </Script>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="KbeS9nQc22k--h-F6XkcyZ0sWF1jTqPQZNFKPnFZJGo" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body cz-shortcut-listen="true">
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
