import Pokemon from "./Pokemon.js";

const listPokemon = document.getElementById("pokemon-list");
const windowDetail = document.getElementById("window-pokemon-detail");
const btnClosePokemonDetail = document.getElementById("btn-close-pokemon-detail-window");
const pokedex = new Pokedex.Pokedex();
/**
 * @type {Pokemon[]}
 */
const everyPokemon = [];

btnClosePokemonDetail.addEventListener("click", closeWindowDetail);

await getAllPokemon();
attachEvents();

/**
 * Get every pokemon, display them in real time, and add them in the array
 * @returns {Promise}
 */
function getAllPokemon(){
    return pokedex.getPokemons({limit: 250}).then(pokemonNames => {
        const everyPromise = [];
        for (let i = 0; i < pokemonNames.results.length; i++) {
            const p = pokemonNames.results[i];
            everyPromise.push(
                pokedex.getPokemonByName(p.name)
                    .then((resp) => {
                        const newPokemon = new Pokemon(resp);
                        everyPokemon.push(newPokemon);
                        displayPokemon(newPokemon);
                    })
            );
        }

        return Promise.all(everyPromise);
    });
}

/**
 * Add the display of the card in the list
 * @param {Pokemon} thePokemon 
 */
function displayPokemon(thePokemon){
    listPokemon.innerHTML += thePokemon.getDisplayCard();
}

/**
 * Link every pokemon card with teh click event to see every detail
 */
function attachEvents(){
    const pokemonCards = document.querySelectorAll(".pokemon-card");
    console.log(pokemonCards);
    for (let i = 0; i < pokemonCards.length; i++) {
        const card = pokemonCards[i];
        card.removeEventListener("click", displayPokemonDetail);
        card.addEventListener("click", displayPokemonDetail);
    }
}

/**
 * Get the actual pokemon clicked and display its details in the window
 * @param {ClickEvent} e 
 */
function displayPokemonDetail(e){
    const id = +e.currentTarget.dataset?.id;
    if(!id) return;
    const pokemon = everyPokemon.find(p => p.id === id);
    if(!pokemon) return;
    const pokemonDetailContent = document.getElementById("pokemon-detail-content");
    pokemonDetailContent.innerHTML = pokemon.getDisplayDetails();
    windowDetail.showModal();
}

/**
 * Close the window
 */
function closeWindowDetail(){
    windowDetail.close();
}