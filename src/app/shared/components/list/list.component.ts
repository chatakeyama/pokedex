import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IPokemon } from '../../interfaces/IPokemon.interface';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  displayedColumns: string[] = ['pokemon-id', 'pokemon-nome', 'pokemon-descricao']
  dataSource: IPokemon[] = []
  loading: boolean = true
  messageError: string = ''
  serverError: boolean = false

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllPokemons()
  }

  getAllPokemons = () => {
    this.messageError = ''
    this.pokemonService.getAll()
      .subscribe(this.onSuccess, this.handleError)
  }

  onSuccess = (result: IPokemon[]) => {
    this.loading = false
    this.dataSource = result
    if (this.isDataSourceEmpty()) {
      this.messageError = 'Nenhum pokémon cadastrado.'
    }
  }

  handleError = () => {
    this.loading = false
    this.messageError = 'Falha na comunicação com o servidor.'
    this.serverError = true
  }

  isDataSourceEmpty = (): boolean => {
    return this.dataSource.length < 1
  }

  onRowClicked(row: any) {
    this.router.navigate([`/pokedex/${row.id}`])
  }

}