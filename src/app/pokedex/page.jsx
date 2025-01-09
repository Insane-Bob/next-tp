"use client";

import { useEffect, useState } from "react";
import { getPokemons } from "../../../services/PokedexApi";
import Modal from "../components/Modal";
import PokemonCard from "../components/PokemonCard";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [limit, setLimit] = useState(50);
  const [typeId, setTypeId] = useState("");
  const [name, setName] = useState("");

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchPokemons() {
    setLoading(true);
    try {
      const pokemons = await getPokemons({ limit, typeId, name });
      setPokemonList(pokemons);
    } catch (err) {
      console.error("Error fetching pokemons:", err);
      setError("Impossible de récupérer les Pokémon.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemons();
  }, [limit, typeId, name]);

  const handleLimitChange = (e) => setLimit(Number(e.target.value));
  const handleTypeChange = (e) => setTypeId(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleOpenModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-red-500 p-6">
        <h1 className="text-4xl font-bold mb-6 text-white">Pokedex</h1>
        <p className="text-center text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-red-500 p-6">
      <h1 className="text-4xl font-bold mb-6 text-whitetext-gray-800">
        Pokedex
      </h1>

      {/* Section des filtres */}
      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Filtre par nom */}
          <input
            type="text"
            placeholder="Rechercher un Pokémon"
            value={name}
            onChange={handleNameChange}
            className="p-2 rounded border border-gray-300 w-full text-gray-500"
          />

          {/* Filtre par typeId */}
          <select
            value={typeId}
            onChange={handleTypeChange}
            className="p-2 rounded border border-gray-300 w-full text-gray-500"
          >
            <option value="">Tous les types</option>
          </select>

          {/* Filtre par limite */}
          <select
            value={limit}
            onChange={handleLimitChange}
            className="p-2 rounded border border-gray-300 w-full text-gray-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Liste des Pokémon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 bg-white p-4 rounded">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            onClick={() => handleOpenModal(pokemon)}
            className="cursor-pointer"
          >
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>

      {/* Loader */}
      {loading && <p className="text-center text-gray-600">Chargement...</p>}

      {/* Modal avec les informations du Pokémon */}
      {selectedPokemon && isModalOpen && (
        <Modal
          pokemon={selectedPokemon}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
