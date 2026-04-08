import './globals.css';

export const metadata = {
  title: "C'est un Boss ça ?",
  description: "Jeu pour deviner si la personne sur l'image est un boss ou non.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
