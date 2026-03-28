const search = document.getElementById("pokemon-search");
const button = document.getElementById("search-btn");
const sprite = document.getElementById("pokemon-sprite");
const errorMsg = document.getElementById("error-msg");
const genesectSprite = document.getElementById("genesect-sprite");
const eternatusSprite = document.getElementById("eternatus-sprite");

async function getPokemon(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

        if (!response.ok) {
            throw new Error("Pokemon not found");
        }

        const data = await response.json();

        sprite.src = data.sprites.front_default;
        sprite.style.display = "block";

        // Restart animation
        sprite.classList.remove("sprite");
        void sprite.offsetWidth;
        sprite.classList.add("sprite");

        errorMsg.style.display = "none";

    } catch (error) {
        sprite.style.display = "none";
        errorMsg.style.display = "block";
        errorMsg.textContent = "Pokemon not found. Try again!";
    }
}

button.addEventListener("click", function () {
    getPokemon(search.value);
});

search.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getPokemon(search.value);
    }
});

async function loadSidePokemon() {
    try {
        // Fetch Genesect
        const gRes = await fetch("https://pokeapi.co/api/v2/pokemon/genesect");
        const gData = await gRes.json();
        genesectSprite.src = gData.sprites.front_default;

        // Fetch Eternatus
        const eRes = await fetch("https://pokeapi.co/api/v2/pokemon/eternatus");
        const eData = await eRes.json();
        eternatusSprite.src = eData.sprites.front_default;

    } catch (error) {
        console.log("Error loading side Pokémon:", error);
    }
}

loadSidePokemon();