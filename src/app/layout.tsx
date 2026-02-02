import React from 'react';

export const metadata = {
  title: 'Payload Project',
  description: 'Website built with Payload and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
