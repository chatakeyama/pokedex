import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPokemon } from '../../interfaces/IPokemon.interface';
import { IPokemonsResolved } from '../../interfaces/IPokemonsResolved.interface';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  displayedColumns: string[] = ['pokemon-id', 'pokemon-nome', 'pokemon-descricao']
  pokemons: IPokemon[] = []
  messageError: string = ''
  pokemons$ = new Observable<any>()
  isLoading$ = new Observable<boolean>()

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pokemons$ = this.activateRoute.data
    this.pokemons$.subscribe(result => {
      this.handleResolverResponse(result.pokemonsResolved)
    })
  }

  handleResolverResponse = (pokemonsResolved: IPokemonsResolved) => {
    if (pokemonsResolved.error) {
      this.messageError = pokemonsResolved.error
    } else {
      this.onSuccess(pokemonsResolved.pokemons)
    }
  }

  onSuccess = (pokemons: IPokemon[]) => {
    this.pokemons = pokemons
    if (pokemons.length < 1) {
      this.messageError = 'Nenhum pokémon cadastrado.'
    }
  }

  onRowClicked(row: any) {
    this.router.navigate([`/pokedex/${row.id}`])
  }

}