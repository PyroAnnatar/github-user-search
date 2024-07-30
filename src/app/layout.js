import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grid place-items-center h-screen w-full md:w-2/4 mx-auto bg-slate-900">
        {children}
      </body>
    </html>
  );
}
