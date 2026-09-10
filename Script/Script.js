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
async function carregarPokemons() {
    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const dados = await response.json();
        for (const pokemon of dados.results) {
            const responsePokemon = await fetch(pokemon.url);
            const poke = await responsePokemon.json();
            const card = document.createElement("div");
            card.classList.add("cardPokemon");
            card.innerHTML = `
                <img src="${poke.sprites.front_default}" alt="${poke.name}">
                <h3>${poke.name}</h3>
            `;
            card.addEventListener("click", () => {
                Pokedex.style.display = "block";
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
            gridPokemon.appendChild(card);
        }
    } catch (erro) {
        console.log("Erro ao carregar os Pokémons:", erro);

    }
}
carregarPokemons();

pokemon.addEventListener("blur", async () => {
    try {
        const AllPokemon = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.value}/`
        );
        if (!AllPokemon.ok) {
            throw new Error("Pokémon não encontrado");
        }
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
    } catch (erro) {
        console.log("Erro ao buscar o Pokémon:", erro);
    }
});

