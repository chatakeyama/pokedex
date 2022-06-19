import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { IPokemon } from '../shared/interfaces/IPokemon.interface';
import { catchError } from 'rxjs/operators';
import ErrorMessages from './errorMessages';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  urlApi = 'http://localhost:3000';
  errorMessages = new ErrorMessages()

  constructor(private http: HttpClient) { }

  add = (pokemon: IPokemon): Observable<any> => {
    return this.http.post(`${this.urlApi}/pokemons`, pokemon)
      .pipe(
        catchError((error) => {
          return throwError(this.errorMessages.getMessage('add', error.status))
        }))
  }

  update = (pokemon: IPokemon): Observable<any> => {
    return this.http.put(`${this.urlApi}/pokemons/${pokemon.id}`, pokemon)
      .pipe(
        catchError((error) => {
          return throwError(this.errorMessages.getMessage('update', error.status))
        }))
  }

  delete = (id: number): Observable<any> => {
    return this.http.delete(`${this.urlApi}/pokemons/${id}`)
      .pipe(
        catchError((error) => {
          return throwError(this.errorMessages.getMessage('delete', error.status))
        }))
  }

  getAll = (): Observable<any> => {
    return this.http.get(`${this.urlApi}/pokemons`)
      .pipe(
        catchError((error) => {
          return throwError(this.errorMessages.getMessage('getAll', error.status))
        }))
  }

  getById = (id: number): Observable<any> => {
    return this.http.get(`${this.urlApi}/pokemons/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(this.errorMessages.getMessage('getById', error.status))
        }))
  }

}