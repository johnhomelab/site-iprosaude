import React from 'react'

export const dynamic = 'force-dynamic'

export default function PayloadGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
