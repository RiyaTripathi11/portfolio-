import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Riya Tripathi | Developer Portfolio",
    template: "%s | Riya Tripathi",
  },
  description:
    "Riya Tripathi's interactive developer portfolio — projects, skills, experience, and engineering work.",
  keywords: [
    "Riya Tripathi",
    "Developer",
    "Software Engineer",
    "Web Developer",
    "Portfolio",
    "Next.js",
    "TypeScript",
    "React",
  ],
  authors: [
    {
      name: "Riya Tripathi",
    },
  ],
  creator: "Riya Tripathi",
  metadataBase: new URL("http://localhost:3000"),
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
