import { IPokemon } from "./IPokemon.interface"

export interface IPokemonsResolved {
    pokemons: IPokemon[]
    error?: any
}