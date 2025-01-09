"use client";

import axios from "axios";

const BASE_URL = "https://nestjs-pokedex-api.vercel.app/pokemons";

export const TYPE_IMAGES = {
  Normal: "https://static.wikia.nocookie.net/pokemongo/images/f/fb/Normal.png",
  Vol: "https://static.wikia.nocookie.net/pokemongo/images/7/7f/Flying.png",
  Poison: "https://static.wikia.nocookie.net/pokemongo/images/0/05/Poison.png",
  Sol: "https://static.wikia.nocookie.net/pokemongo/images/8/8f/Ground.png",
  Insecte: "https://static.wikia.nocookie.net/pokemongo/images/7/7d/Bug.png",
  Feu: "https://static.wikia.nocookie.net/pokemongo/images/3/30/Fire.png",
  Eau: "https://static.wikia.nocookie.net/pokemongo/images/9/9d/Water.png",
  Plante: "https://static.wikia.nocookie.net/pokemongo/images/c/c5/Grass.png",
  Électrik:
    "https://static.wikia.nocookie.net/pokemongo/images/2/2f/Electric.png",
  Fée: "https://static.wikia.nocookie.net/pokemongo/images/4/43/Fairy.png",
};

export async function getPokemons({ page = 1, limit = null, typeId, name }) {
  try {
    let url = `${BASE_URL}`;

    if (limit) {
      console.log(limit);
      url += `?limit=${limit}`;
    }

    if (typeId) {
      url += `&typeId=${typeId}`;
    }

    if (name) {
      url += `&name=${name}`;
    }

    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    console.error("Error while fetching pokemons:", error);
    throw error;
  }
}

async function getPokemonFullData(identifier) {
  try {
    const { data: pokemonData } = await axios.get(
      `${BASE_URL}pokemon/${identifier}`
    );

    const { data: speciesData } = await axios.get(
      `${BASE_URL}pokemon-species/${identifier}`
    );
    const { data: evolutionData } = await axios.get(
      speciesData.evolution_chain.url
    );

    const evolutions = extractEvolutions(evolutionData);

    console.log(evolutions);

    const result = {
      id: pokemonData.id,
      pokedexId: pokemonData.id,
      name:
        pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
      image: pokemonData.sprites.other["official-artwork"].front_default,
      sprite: pokemonData.sprites.front_default,
      stats: {
        HP: pokemonData.stats[0].base_stat,
        attack: pokemonData.stats[1].base_stat,
        defense: pokemonData.stats[2].base_stat,
        specialAttack: pokemonData.stats[3].base_stat,
        specialDefense: pokemonData.stats[4].base_stat,
        speed: pokemonData.stats[5].base_stat,
      },
      generation: parseGeneration(speciesData.generation.name),
      evolutions: evolutions.map((evo) => ({
        name: evo.name,
        pokedexId: evo.pokedexId,
      })),
      types: pokemonData.types.map((typeInfo) => ({
        id: typeInfo.slot,
        name:
          typeInfo.type.name.charAt(0).toUpperCase() +
          typeInfo.type.name.slice(1),
        image: extractPokemonTypeImage(typeInfo.type.name),
      })),
    };

    return result;
  } catch (error) {
    console.error("Error while fetching pokemon details:", error);
    throw error;
  }
}

function extractPokemonTypeImage(type) {
  return TYPE_IMAGES[type] || null;
}

function extractEvolutions(evolutionData) {
  const evolutions = [];
  let current = evolutionData.chain;

  while (current) {
    evolutions.push({
      name:
        current.species.name.charAt(0).toUpperCase() +
        current.species.name.slice(1),
      pokedexId: extractPokedexId(current.species.url),
    });
    current = current.evolves_to[0];
  }

  return evolutions;
}

function extractPokedexId(url) {
  const match = url.match(/\/([0-9]+)\/$/);
  return match ? parseInt(match[1], 10) : null;
}

function parseGeneration(generationName) {
  return parseInt(generationName.replace("generation-", ""), 10);
}

export default {
  getPokemons,
  getPokemonFullData,
};
