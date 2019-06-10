let buttonSearch;
let inputPokemon;
let namePokemon;
let idPokemon;
let picturePokemon;
const spinner = document.querySelector(".spinner");

function reload() {
    document
        .getElementById("search-Pokemon")
        .addEventListener("click", searchPokemon);
    inputPokemon = document.querySelector(".input-pokemon").value.toLowerCase();
    namePokemon = document.querySelector(".name-pokemon");
    idPokemon = document.querySelector(".id-pokemon");
    picturePokemon = document.querySelector(".img-pokemon");
    weightPokemon = document.getElementById("weight");
    heightPokemon = document.getElementById("height");
}

function spinnerLoading(param) {
    if (param === "hide") {
        idPokemon.style.display = "none";
        picturePokemon.style.display = "none";
        namePokemon.style.display = "none";
        spinner.style.display = "block";
    } else {
        idPokemon.style.display = "block";
        picturePokemon.style.display = "block";
        namePokemon.style.display = "block";
        spinner.style.display = "none";
    }
}

function searchPokemon(e) {
    e.preventDefault();
    reload();
    spinnerLoading("hide");
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputPokemon}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            throw response;
        })
        .then((pokemon) => {
            spinnerLoading("show");
            let name = pokemon.name;
            let id = pokemon.id;
            let picture = pokemon.sprites.front_default;
            let weight = pokemon.weight;
            let height = pokemon.height;

            document.querySelector(".types-list").innerHTML = "";
            for (const key in pokemon.types) {
                if (pokemon.types.hasOwnProperty(key)) {
                    const types = pokemon.types[key].type.name;
                    document.querySelector(".types-list").innerHTML += `
                        <li>${types}</li>
                    `;
                }
            }

            namePokemon.innerHTML = name;
            idPokemon.innerHTML = `#${id}`;

            picturePokemon.setAttribute("src", picture);

            weightPokemon.innerHTML = `WEIGHT: ${weight}`;
            heightPokemon.innerHTML = `HEIGHT: ${height}`;
        })
        .catch((error) => {
            spinnerLoading("show");
            if (error.status === 404) {
                let oldId = idPokemon.innerHTML;
                let oldName = namePokemon.innerHTML;
                let oldPicture = document
                    .querySelector(".img-pokemon")
                    .getAttribute("src");

                idPokemon.innerHTML = "ERROR";
                namePokemon.innerHTML = "DOES NOT EXIST";
                picturePokemon.setAttribute("src", "./img/emoji.png");

                setInterval(() => {
                    idPokemon.innerHTML = oldId;
                    namePokemon.innerHTML = oldName;
                    picturePokemon.setAttribute("src", oldPicture);
                }, 2000);

                document.querySelector(".input-pokemon").value = "";
            }
        });
}

reload();
