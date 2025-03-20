// URL de la PokeAPI para obtener información sobre los tipos de Pokémon
const typesUrl = 'https://pokeapi.co/api/v2/type/';

// Elemento select para los tipos de Pokémon
const typesSelectElement = document.getElementById('types');

// Elemento donde se mostrarán los Pokémon del tipo seleccionado
const pokemonListElement = document.getElementById('pokemon-list');

// Función para obtener la lista de tipos de Pokémon y llenar el select
function getTypes() {
  axios.get(typesUrl)
    .then(response => {
      const typesData = response.data.results;

      // Limpiar el select antes de agregar nuevas opciones
      typesSelectElement.innerHTML = '';

      // Llenar el select con los tipos de Pokémon
      typesData.forEach(type => {
        const option = document.createElement('option');
        option.value = type.name;
        option.textContent = type.name;
        typesSelectElement.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al obtener tipos de Pokémon:', error.message);
    });
}

// Función para obtener Pokémon por tipo seleccionado
function getPokemonByType() {
    const selectedType = typesSelectElement.value;
  
    // URL para obtener la lista de Pokémon por tipo
    const pokemonTypeUrl = `https://pokeapi.co/api/v2/type/${selectedType}`;
  
    axios.get(pokemonTypeUrl)
      .then(response => {
        const pokemonOfType = response.data.pokemon;
  
        // Mostrar información de los Pokémon del tipo seleccionado
        const pokemonCards = pokemonOfType.map(pokemon => {
          // Crear una tarjeta para cada Pokémon
          return `
            <div class="pokemon-card">
              <h2>${pokemon.pokemon.name}</h2>
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.url.split('/').slice(-2, -1)}.png" alt="${pokemon.pokemon.name}">
            </div>
          `;
        });
  
        // Mostrar las tarjetas en el contenedor
        pokemonListElement.innerHTML = pokemonCards.join('');
      })
      .catch(error => {
        console.error(`Error al obtener Pokémon del tipo ${selectedType}:`, error.message);
      });
  
    // Evitar la recarga de la página
    return false;
  }
  

// Llenar el select con los tipos de Pokémon al cargar la página
getTypes();
