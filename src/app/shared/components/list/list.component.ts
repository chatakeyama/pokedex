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

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPokemons()
  }

  getAllPokemons = () => {
    this.pokemonService.getAll().subscribe(result => {
      this.dataSource = result
    })
  }

  onClickRow(row: any) {
    this.router.navigate([`/pokedex/${row.id}`])
  }

}
