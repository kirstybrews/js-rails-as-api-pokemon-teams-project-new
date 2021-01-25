const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
})

function qSelect(id) {
    return document.querySelector(id)
}

function el(el) {
    return document.createElement(el)
}

function fetchTrainers() {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(trainers => trainers.forEach(function(trainer) {
            renderTrainer(trainer)
        }))
}

function renderTrainer(trainer) {
    let trainerContainer = qSelect('#trainer-container')
    let card = el('div')
        card.className = "card"
        card.setAttribute("data-id", trainer.id)
    let p = el('p')
        p.innerText = trainer.name
    let button = el('button')
        button.setAttribute("data-trainer-id", trainer.id)
        button.innerText = "Add Pokemon"
        button.addEventListener('click', () => {
            if (trainer.pokemons.length < 6) {
                addPokemon(trainer, ul)
            } else {
                alert('You already have 6 pokemon!')
            }
        })
    let ul = el('ul')
    trainer.pokemons.forEach(function(pokemon) {
        renderPokemon(pokemon, ul)
    })
    card.append(p, button, ul)
    trainerContainer.appendChild(card)
}

function renderPokemon(pokemon, ul) {
    let li = el('li')
        li.innerText = `${pokemon.nickname} (${pokemon.species}) `
    let button = el('button')
        button.className = "release"
        button.setAttribute("data-pokemon-id", pokemon.id)
        button.innerText = "Release"
        button.addEventListener('click', () => {
            deletePokemon(pokemon, li)
        })
    li.appendChild(button)
    ul.appendChild(li)
}

function deletePokemon(pokemon, li) {
    console.log(pokemon, li)
    fetch(POKEMONS_URL + `/${pokemon.id}`, {method: "DELETE"})
        .then(res => res.json())
        .then(li.remove())
}

function addPokemon(trainer, ul) {
    let newPokemon = {
        trainer_id: trainer.id
    }
    
    let reqPackage = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newPokemon)
    }

    fetch(POKEMONS_URL, reqPackage)
        .then(res => res.json())
        .then(pokemonObj => {
            renderPokemon(pokemonObj, ul)
        })
}