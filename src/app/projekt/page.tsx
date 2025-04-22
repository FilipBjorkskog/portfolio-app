import Link from 'next/link';
import { CodeBracketIcon, StarIcon } from '@heroicons/react/24/solid';

async function getRepositories() {
  const response = await fetch('https://api.github.com/users/FilipBjorkskog/repos');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export default async function Projects() {
  const repositories = await getRepositories();

  return (
    <div className="bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 min-h-screen py-10">
      <main className="mx-auto mt-8 p-6 bg-white shadow-md rounded-md max-w-screen-xl">
        <h2 className="text-2xl font-bold mb-4">Mina Projekt på GitHub</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repositories.map((repo: {
            id: number;
            name: string;
            html_url: string;
            description: string | null;
            language: string | null;
            stargazers_count: number;
          }) => (
            <li
              key={repo.id}
              className="bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2">
                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">
                  {repo.name}
                </Link>
              </h3>
              <p className="text-gray-700 text-sm mb-4">{repo.description || 'Ingen beskrivning tillgänglig.'}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                {repo.language && (
                  <span className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-2 py-1 font-semibold mr-2">
                    <CodeBracketIcon className="h-4 w-4 mr-1" />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="inline-flex items-center bg-yellow-100 text-yellow-700 rounded-full px-2 py-1 font-semibold">
                    <StarIcon className="h-4 w-4 mr-1" />
                    {repo.stargazers_count} stjärnor
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}