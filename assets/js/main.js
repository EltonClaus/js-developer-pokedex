const renderPoke = document.querySelector(".pokemons");
const loadMoreButton = document.querySelector("#loadMoreButton");
const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
        </ol>

      <img src="${pokemon.photo}"
           alt="${pokemon.name}">
      </div>
      <div class="status">
      <ol class="stats">
          ${pokemon.stats
            .map((stat) => `<li class="type ${stat}">${stat}</li>`)
            .join("")}
      </ol>
      <ol>
      ${pokemon.baseStat
        .map(
          (baseStat) =>
            `<li class="progress"><progress value="${baseStat}" max="141" style="--value: 25; --max: 141;"></progress><span>${baseStat}</span></li>`).join("")}
      </ol>
    </div>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newLHtml = pokemons.map(convertPokemonToLi).join("");
    renderPoke.innerHTML += newLHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
