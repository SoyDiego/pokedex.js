let buttonSearch;
let inputPokemon;
let namePokemon;
let idPokemon;
let picturePokemon;

function reload() {
    document.getElementById('search-Pokemon').addEventListener('click', searchPokemon);
    inputPokemon = document.querySelector('.input-pokemon').value.toLowerCase();
    namePokemon = document.querySelector('.name-pokemon');
    idPokemon = document.querySelector('.id-pokemon');
    picturePokemon = document.querySelector('.img-pokemon');
    weightPokemon = document.getElementById('weight');
    heightPokemon = document.getElementById('height');
}

function searchPokemon(e) {
    e.preventDefault();
    reload();
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputPokemon}`)
        .then((response) => response.json())
        .then((pokemon) => {
            let name = pokemon.name;
            let id = pokemon.id;
            let picture = pokemon.sprites.front_default;
            let weight = pokemon.weight;
            let height = pokemon.height;

            document.querySelector('.types-list').innerHTML = '';
            for (const key in pokemon.types) {
                if (pokemon.types.hasOwnProperty(key)) {
                    const types = pokemon.types[key].type.name;
                    document.querySelector('.types-list').innerHTML += `
                        <li>${types}</li>
                    `;
                }
            }

            namePokemon.innerHTML = name;
            idPokemon.innerHTML = `#${id}`;


            picturePokemon.setAttribute('src', picture);

            weightPokemon.innerHTML = `WEIGHT: ${weight}`;
            heightPokemon.innerHTML = `HEIGHT: ${height}`;

        })
        .catch((error) => {
            console.log(error)
        })
}

reload();