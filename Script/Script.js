const Imagem = document.getElementById("Imagem");
const Nome = document.getElementById("Nome");
const Altura = document.getElementById("Altura");
const Peso = document.getElementById("Peso");
const Tipo = document.getElementById("Tipo");
const Ataque = document.getElementById("Ataque");
const Defesa = document.getElementById("Defesa");
const HP = document.getElementById("HP");
const Velocidade = document.getElementById("Velocidade");


Imagem.addEventListener("blur", async () =>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`)
})