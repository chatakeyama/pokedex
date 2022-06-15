import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllPokemons()
  }

  getAllPokemons = () => {
    this.pokemonService.getAll().subscribe(
      result => {
        this.loading = false
        this.dataSource = result
      }, error => {
        this.loading = false
        this.toastr.error('Não foi possível comunicar-se com o servidor')
      })
  }

  onClickRow(row: any) {
    this.router.navigate([`/pokedex/${row.id}`])
  }

  isDataSourceNotEmpty = (): boolean => {
    return this.dataSource.length > 0
  }
}