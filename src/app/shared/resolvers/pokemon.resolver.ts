import { Injectable } from '@angular/core';
import { catchError, delay, map } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IPokemonResolved } from '../interfaces/IPokemonResolved.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonResolver implements Resolve<IPokemonResolved> {

  constructor(private pokemonService: PokemonService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IPokemonResolved> {
    const id = route.params.id
    return this.pokemonService.getById(id).pipe(
      delay(1000),
      map(result => ({ pokemon: result, error: null })),
      catchError((error) => {
        return of({ pokemon: undefined, error: error })
      })
    )
  }
}
