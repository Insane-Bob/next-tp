"use client";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-red-500 text-gray-800">
      {/* Header */}
      <header className="text-center mt-8">
        <h1 className="text-4xl font-bold text-yellow-500 drop-shadow-md">
          Welcome to the Pokedex
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Explore the world of Pokémon and discover your favorites!
        </p>
      </header>

      <main className="flex flex-col items-center justify-center flex-1">
        <a
          href="/pokedex"
          className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-yellow-500 transition-all duration-300 shadow-md"
        >
          Voir le Pokedex
        </a>
      </main>
    </div>
  );
}
