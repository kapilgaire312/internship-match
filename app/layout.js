import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f5f6fc]">{children}</body>
    </html>
  );
}
