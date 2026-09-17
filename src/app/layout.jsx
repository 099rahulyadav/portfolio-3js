import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
export const metadata = {
  title: {
    default: "Rahul Yadav",
    template: "%s | Rahul Yadav",
  },
  description: "Rahul yadav— full-stack developer. Portfolio, projects & work.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/rahul-logo.png",
    apple: "/apple-icon.png",
  },
};
export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
