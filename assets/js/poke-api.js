
const pokeApi = {}

function converterPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name
  
  const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  const stats = pokeDetail.stats.map((statsBase) => statsBase.stat.name)
  const [stat] = stats

  pokemon.stats = stats
  pokemon.stat = stat

  const baseStat = pokeDetail.stats.map((detailBase) => detailBase.base_stat)
  const [base_stat] = baseStat

  pokemon.baseStat = baseStat
  pokemon.base_stat = base_stat
   


  pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.number}.gif`

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url)
          .then((response) => response.json())
          .then(converterPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
      .then((response) => response.json())
      .then((jsonBody) => jsonBody.results)
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
      .then((detailRequests) => Promise.all(detailRequests ))
      .then((pokemonsDetails) => pokemonsDetails)
      
} 
