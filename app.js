const app = {
    // GENERIC VARIABLE
    cardContainer: document.getElementById('cardsContainer'),

    init: function () {
        // app.getAllPokemonData()
        app.displayPokemon()
    },

    // RECUPERATION DE TOUT LES POKEMONS
    getAllPokemonData: async function () {
        let allPokemon = []
        // 906 au total
        for (let index = 1; index < 906; index++) {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`).then(function (response) {
                allPokemon.push(response.data)
            }).catch(function (error) {
                console.log(error);
            })
        }
        return allPokemon
    },

    // POKEMON CARD DISPLAY
    displayPokemon: async function () {
        // GET POKEMON DATA
        const pokemonData = await app.getAllPokemonData().then((data) => {
            return data
        })

        // POKEMON CARD GENERATOR
        pokemonData.forEach((_d) => {
            // ------------------- //
            // PICTURE IN CARD
            const pokemonCard = document.createElement('div')
            pokemonCard.setAttribute('class', 'card')

            // ------------------- //
            // PICTURE IN CARD
            const pokemonPictureInCard = document.createElement('img')
            pokemonPictureInCard.setAttribute('class', "card__pokemon-picture")
            pokemonPictureInCard.setAttribute('alt', _d.name)
            pokemonPictureInCard.setAttribute("src", _d.sprites.front_default)

            // ------------------- //
            // POKEMON NAME IN CARD
            const pokemonNameInCard = document.createElement('h2')
            pokemonNameInCard.setAttribute('class', "card__pokemon-name")
            pokemonNameInCard.innerText = `#${_d.id} ${_d.name}`

            // ------------------- //
            // POKEMON TYPES IN CARD
            const pokemonTypeContainer = document.createElement('div')
            pokemonTypeContainer.setAttribute('class', "card__type-container")
            _d.types.forEach((_t) => {
                const pokemonTypeInCard = document.createElement('p')
                pokemonTypeInCard.setAttribute('class', `${_t.type.name} card__type-paragraph`)
                pokemonTypeInCard.innerText = _t.type.name
                pokemonTypeContainer.append(pokemonTypeInCard)
            })

            // ------------------- //
            // ADD CART TO MAIN
            pokemonCard.append(pokemonPictureInCard, pokemonNameInCard, pokemonTypeContainer)
            app.cardContainer.appendChild(pokemonCard)
        })
        console.log(pokemonData);
    }
}

document.addEventListener('DOMContentLoaded', app.init())