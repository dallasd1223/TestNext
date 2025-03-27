import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { myCustomFont } from './lib/fonts'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myCustomFont.variable}`}>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
