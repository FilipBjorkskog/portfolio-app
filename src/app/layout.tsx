import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

async function getUser() {
  const response = await fetch('https://api.github.com/users/FilipBjorkskog');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const profileImageUrl = user?.avatar_url;
  const githubUrl = 'https://github.com/FilipBjorkskog';

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white backdrop-blur-sm shadow-md py-6">
          <div className="container mx-auto flex items-center gap-8 px-4">
            {profileImageUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-full overflow-hidden h-10 w-10 hover:opacity-80 transition duration-300">
                <Image src={profileImageUrl} alt="Min Profilbild" width={40} height={40} />
              </a>
            )}
            <h1 className="text-2xl font-bold text-gray-800">{user?.login}&apos;s Portfolio</h1>
            <nav className="absolute right-4">
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="text-gray-700 hover:text-blue-400">Startsida</Link>
                </li>
                <li>
                  <Link href="/om-mig" className="text-gray-700 hover:text-purple-400">Om mig</Link>
                </li>
                <li>
                  <Link href="/projekt" className="text-gray-700 hover:text-pink-400">Projekt</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}