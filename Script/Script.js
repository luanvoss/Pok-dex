const Pokedex = document.querySelector(".Pokedex");
const gridPokemon = document.getElementById("gridPokemon");
const modalBody = document.getElementById("modalBody");
const modalTitle = document.getElementById("modalTitle");
const pokemonModalElement = document.getElementById("pokemonModal");
const pokemonModal = new bootstrap.Modal(pokemonModalElement);
const filtroPokemon = document.getElementById("filtroPokemon");
let todosPokemons = [];

async function PegarPokemon() {
    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        const data = await response.json();
        todosPokemons = await Promise.all(
            data.results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                return await response.json();
            })
        );
        todosPokemons.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        renderizarPokemons();
    } catch (error) {
        console.log(error);
    }
}

function renderizarPokemons(lista = todosPokemons) {
    gridPokemon.innerHTML = "";
    lista.forEach(pokemon => {
        const tipo = pokemon.types[0].type.name;
        const card = document.createElement("div");
        card.classList.add("card", "col-3", tipo);
        card.style.width = "18rem";
        card.innerHTML = `
            <img 
                src="${pokemon.sprites.other["official-artwork"].front_default}" 
                class="card-img-top" 
                alt="${pokemon.name}"
            >
            <div class="card-body">
                <h5 class="card-title">${pokemon.name}</h5>
            </div>
        `;
        card.addEventListener("click", () => AbrirModal(pokemon));
        gridPokemon.appendChild(card);
    });
}

filtroPokemon.addEventListener("input", () => {
    const texto = filtroPokemon.value.toLowerCase().trim();
    const pokemonsFiltrados = todosPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(texto)
    );
    renderizarPokemons(pokemonsFiltrados);
});

PegarPokemon();

function AbrirModal(pokemon) {
    modalTitle.textContent = pokemon.name;
    modalBody.innerHTML = `
            <img 
                src="${pokemon.sprites.other["official-artwork"].front_default}" 
                class="card-img-top" 
                alt="${pokemon.name}"
            >
            <div class="card-body">
                <h5 class="card-title">${pokemon.name}</h5>
            </div>
                <div class="attack">
        <h5 class="card-title">
            <i class="bi bi-lightning-charge-fill"></i>
            ${pokemon.stats.find(stat => stat.stat.name === "attack").base_stat}
        </h5>
    </div>
    <div class="defense">
        <h5 class="card-title">
            <i class="bi bi-shield-fill"></i>
            ${pokemon.stats.find(stat => stat.stat.name === "defense").base_stat}
        </h5>
    </div>
    <div class="hp">
        <h5 class="card-title">
            <i class="bi bi-heart-fill"></i>
            ${pokemon.stats.find(stat => stat.stat.name === "hp").base_stat}
        </h5>
    </div>
    <div class="speed">
        <h5 class="card-title">
            <i class="bi bi-wind"></i>
            ${pokemon.stats.find(stat => stat.stat.name === "speed").base_stat}
        </h5>
    </div>
    <div class="weight">
        <h5 class="card-title">
            <i class="bi bi-speedometer2"></i>
            ${pokemon.weight / 10} kg
        </h5>
    </div>
    <div class="height">
        <h5 class="card-title">
            <i class="bi bi-arrows-vertical"></i>
            ${pokemon.height / 10} m
        </h5>
    </div>
`;
    pokemonModal.show();
}



