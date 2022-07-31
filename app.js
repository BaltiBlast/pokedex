const app = {
    // GENERIC VARIABLE
    cardContainer: document.getElementById('cardsContainer'),


    // ---------------------------------------------------------------------------------------------
    init: function () {
        // app.getAllPokemonData()
        app.displayPokemon()
    },

    // ---------------------------------------------------------------------------------------------
    // RECUPERATION DE TOUT LES POKEMONS
    getAllPokemonData: async function () {

        // ----------- //
        // 1. CREATE EMPTY ARRAY
        let allPokemon = []


        // ----------- //
        // 2. LOOP GET ALL POKEMON 1 BY 1 (total : 906 at 2022-07-31)
        for (let index = 1; index < 11; index++) {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`).then(function (response) {

                // ----------- //
                // 3. EACH POKEMON FETCHED IN ARRAY
                allPokemon.push(response.data)
            }).catch(function (error) {
                console.log(error);
            })
        }

        // ----------- //
        // 4. RETURN ALL POKEMON ARRAY
        return allPokemon
    },

    // --------------------------------------------------------------------------------------------- //
    displayPokemon: async function () {
        // ----------------------------- //
        // FETCH ALL POKEMON 
        const pokemonData = await app.getAllPokemonData().then((data) => {
            return data
        })

        // --------------------------------------- //
        // ~ POKEMON CARD GENERATOR ~ //

        // ----------- //
        // 1. LOOP CREATING EACH CARD
        pokemonData.forEach((_d) => {
            // ----------- //
            // 2. PICTURE IN CARD
            let pokemonCard = document.createElement('div')
            pokemonCard.setAttribute('class', 'card')

            // ----------- //
            // 3. PICTURE IN CARD
            const pokemonPictureInCard = document.createElement('img')
            pokemonPictureInCard.setAttribute('class', "card__pokemon-picture")
            pokemonPictureInCard.setAttribute('alt', _d.name)
            pokemonPictureInCard.setAttribute("src", _d.sprites.front_default)

            // ----------- //
            // 4. POKEMON NAME IN CARD
            const pokemonNameInCard = document.createElement('h2')
            pokemonNameInCard.setAttribute('class', "card__pokemon-name")
            pokemonNameInCard.innerText = `#${_d.id} ${_d.name}`

            // ----------- //
            // 5. POKEMON TYPES IN CARD
            const pokemonTypeContainer = document.createElement('div')
            pokemonTypeContainer.setAttribute('class', "card__type-container")
            _d.types.forEach((_t) => {
                const pokemonTypeInCard = document.createElement('p')
                pokemonTypeInCard.setAttribute('class', `${_t.type.name} card__type-paragraph`)
                pokemonTypeInCard.innerText = _t.type.name
                pokemonTypeContainer.append(pokemonTypeInCard)
            })

            // ----------- //
            // 6. ADD EACH ELEMENTS TO CARD
            pokemonCard.append(pokemonPictureInCard, pokemonNameInCard, pokemonTypeContainer)

            // ----------- //
            // 7. ADD CARD TO MAIN C ARD CONTAINER
            app.cardContainer.appendChild(pokemonCard)
        })

        // --------------------------------------- //
        // ~ FILTERS BY VARIOUS CATEGORIES ~ //

        // ----------- //
        // GENERIC FILTERS ELEMENTS
        const allPokemonCardDisplayed = document.querySelectorAll('.card')
        const inputPokemonByName = document.getElementById('inputPokemonByName')
        const selectPokemonByType = document.getElementById('selectPokemonByType')

        // --------------------- //
        // ~ A. FILTERED BY NAME

        // ----------- //
        // A1. ADD EVENT ON INPUT TEXT
        inputPokemonByName.addEventListener('keyup', (e) => {
            const inputValue = e.target.value

            // ----------- //
            // A2. EXECUTE FUNCTION EVERYTIME KEYUP
            app.pokemonFilteredByName(allPokemonCardDisplayed, inputValue)
        })

        // --------------------- //
        // ~ B. FILTERED BY TYPES
        selectPokemonByType.addEventListener('change', (e) => {
            const selectValue = e.target.value
            app.pokemonFilteredByType(allPokemonCardDisplayed, selectValue)
        })
    },

    // --------------------------------------------------------------------------------------------- //
    // FILTER BY NAME
    pokemonFilteredByName: function (cards, inputValue) {
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].children[1].innerText.toLowerCase().includes(inputValue.toLowerCase())) {
                cards[i].classList.remove('hidden')
            } else {
                cards[i].classList.add('hidden')
            }
        }
    },

    // --------------------------------------------------------------------------------------------- //
    // FILTER BY TYPE
    pokemonFilteredByType: function (cards, selectValue) {

        for (let i = 0; i < cards.length; i++) {
            if (cards[i].innerText.toLowerCase().includes(selectValue.toLowerCase())) {
                cards[i].classList.remove('hidden')
            } else if (selectValue === "all") {
                cards[i].classList.remove('hidden')
            } else {
                cards[i].classList.add('hidden')
            }
        }
    },
}

document.addEventListener('DOMContentLoaded', app.init())