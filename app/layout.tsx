import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";



const inter = Inter({ subsets: ["latin"] });

<body className={inter.className}></body>

// Inter font loaded via Google Fonts in globals.css

export const metadata: Metadata = {
  title: "The Saver - Dog Rescue & Adoption",
  description: "Join us in rescuing dogs and finding them loving homes. Adopt, donate, report lost pets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
