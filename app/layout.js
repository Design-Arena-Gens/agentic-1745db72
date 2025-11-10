export const metadata = {
  title: 'Générateur de Photo d\'Influenceur',
  description: 'Créez des photos d\'influenceur professionnelles avec l\'IA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
