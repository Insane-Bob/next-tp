"use client";

export default function Modal({ pokemon, isOpen, onClose }) {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            {pokemon?.name || "Nom inconnu"}
          </h2>
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Image */}
        <div className="mb-6 flex justify-center">
          {pokemon?.image ? (
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-64 h-64 object-contain rounded-lg shadow-lg"
            />
          ) : (
            <p className="text-gray-600">Image non disponible</p>
          )}
        </div>

        {/* Types */}
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Types</h3>
            {pokemon?.types?.length > 0 ? (
              <div className="flex gap-3 flex-wrap">
                {pokemon.types.map((type) => (
                  <span
                    key={type.name}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Aucun type disponible</p>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Évolution
            </h3>
            {pokemon?.evolutions?.length > 0 ? (
              <div className="flex gap-3 flex-wrap">
                {pokemon.evolutions.map((evolution) => (
                  <span
                    key={evolution.name}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    {evolution.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Pas d'évolution disponible</p>
            )}
          </div>
        </div>

        {/* Evolution */}
        <div className="flex justify-between mb-6"></div>

        {/* Stats */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Statistiques
          </h3>
          {pokemon?.stats ? (
            <ul className="space-y-2">
              {Object.entries(pokemon.stats).map(([key, value]) => (
                <li key={key} className="text-gray-600">
                  <span className="font-medium text-gray-800">{key}:</span>{" "}
                  {value}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Statistiques non disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
}
