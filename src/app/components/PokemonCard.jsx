"use client";

export default function PokemonCard({ pokemon }) {
  return (
    <li
      className="flex flex-col items-center bg-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out
     border border-gray-300 rounded p-2 text-black select-none h-full"
    >
      <p className="text-gray-500">
        #{pokemon.id} - Génération {pokemon.generation}
      </p>
      <img src={pokemon.image} alt={pokemon.name} height={120} width={120} />
      <p className="text-xl font-semibold">{pokemon.name}</p>
      <p className="text-sm text-gray-600">{pokemon.type}</p>

      <div className="flex flex-row justify-center">
        {pokemon.types.map((type) => (
          <img
            key={type.id}
            src={type.image}
            alt={type.name}
            height={30}
            width={30}
            className="mx-1"
          />
        ))}
      </div>

      {/* Vérification des évolutions */}
      {pokemon.evolutions && pokemon.evolutions.length > 0 && (
        <div className="mt-4 text-center text-gray-700">
          <p className="text-sm font-semibold">
            +{pokemon.evolutions.length} Évolutions
          </p>
        </div>
      )}
    </li>
  );
}
