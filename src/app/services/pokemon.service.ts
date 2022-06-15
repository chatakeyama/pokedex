import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPokemon } from '../shared/interfaces/IPokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  urlApi = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  add = (pokemon: IPokemon): Observable<any> => {
    return this.http.post(`${this.urlApi}/pokemons`, pokemon)
  }

  update = (pokemon: IPokemon): Observable<any> => {
    return this.http.put(`${this.urlApi}/pokemons/${pokemon.id}`, pokemon)
  }

  delete = (id: number): Observable<any> => {
    return this.http.delete(`${this.urlApi}/pokemons/${id}`)
  }

  getAll = (): Observable<any> => {
    return this.http.get(`${this.urlApi}/pokemons`)
  }

  getById = (id: number): Observable<any> => {
    return this.http.get(`${this.urlApi}/pokemons/${id}`)
  }

}
