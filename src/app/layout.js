import './globals.css'

export const metadata = {
  title: 'Harshini Kanamathareddy — Software Engineer',
  description: 'iOS & Full-Stack Engineer specializing in Swift, Python, React, and AI/ML systems. 3+ years building production software at scale.',
  keywords: 'iOS Developer, Swift, Python, React, Full-Stack, ML, Software Engineer, San Jose',
  openGraph: {
    title: 'Harshini Kanamathareddy — Software Engineer',
    description: 'iOS & Full-Stack Engineer · 3+ years · Swift · Python · React · AWS',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
