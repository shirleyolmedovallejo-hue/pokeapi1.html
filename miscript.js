function buscarPokemon(){

    let nombre = document
        .getElementById("pokemon")
        .value
        .toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(response => {

        if(!response.ok){
            throw new Error("Pokemon no encontrado");
        }

        return response.json();
    })
    .then(data => {

        document.getElementById("resultado").innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>

            <img src="${data.sprites.front_default}">

            <p><b>Altura:</b> ${data.height}</p>

            <p><b>Peso:</b> ${data.weight}</p>

            <p><b>Experiencia Base:</b> ${data.base_experience}</p>

            <p><b>Tipos:</b> ${data.types.map(t => t.type.name).join(", ")}</p>
        `;
    })
    .catch(error => {
        document.getElementById("resultado").innerHTML =
        "<h3>Pokémon no encontrado</h3>";
    });
}

