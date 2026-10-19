import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BSANXS — Technology, Intentionally Engineered",
  description:
    "BSANXS engineers digital products, intelligent automation and connected technology systems for businesses building what's next.",
  applicationName: "BSANXS",
  openGraph: {
    title: "BSANXS — Technology, Intentionally Engineered",
    description:
      "Ambitious ideas, engineered into reality. Discover BSANXS software engineering, AI and digital product capabilities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
