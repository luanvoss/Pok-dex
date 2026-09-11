
const pokemon = document.getElementById("Pokemon")
const Imagem = document.getElementById("Imagem");
const Nome = document.getElementById("Nome");
const Altura = document.getElementById("Altura");
const Peso = document.getElementById("Peso");
const Tipo = document.getElementById("Tipo");
const Ataque = document.getElementById("Ataque");
const Defesa = document.getElementById("Defesa");
const HP = document.getElementById("HP");
const Velocidade = document.getElementById("Velocidade");
const Pokedex = document.querySelector(".Pokedex");
const gridPokemon = document.getElementById("gridPokemon");


async function PegarPokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await response.json();
        TodosPokemons = await Promise.all(
            data.results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                return await response.json();
            })
        )
        renderizarPokemons();
    } catch (error) {
        console.log(error);
    };
};

function renderizarPokemons() {
    console.log( "todosPokemons:\N",TodosPokemons );
    TodosPokemons.forEach(pokemon => {
        gridPokemon.innerHTML += `
            <div class="card col-3" style="width: 18rem;">
                <img 
                    src="${pokemon.sprites.other["official-artwork"].front_default}" 
                    class="card-img-top" 
                    alt="${pokemon.name}"
                >
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                </div>
            </div>
        `;
    });
}
PegarPokemon();


pokemon.addEventListener("blur", async () => {
   
        const poke = await AllPokemon.json();
        Imagem.src = poke.sprites.front_default;
        Nome.value = poke.name;
        Altura.value = poke.height;
        Peso.value = poke.weight;
        Tipo.value = poke.types[0].type.name;
        Ataque.value = poke.stats[1].base_stat;
        Defesa.value = poke.stats[2].base_stat;
        HP.value = poke.stats[0].base_stat;
        Velocidade.value = poke.stats[5].base_stat; 
});




