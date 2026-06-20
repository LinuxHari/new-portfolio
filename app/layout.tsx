import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hariharan Manohar - Software engineer specialized in full-stack development",
  description: "Software Engineer with 2 years 8 months in building user-centered full-stack applications. Skilled in JavaScript, I enhances digital experiences through innovative, data-driven solutions and seamless functionality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
