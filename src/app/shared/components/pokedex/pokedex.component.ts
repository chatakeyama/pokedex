import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { switchMap } from 'rxjs/operators';
import { IPokemon } from '../../interfaces/IPokemon.interface';
import { PokemonModel } from '../../models/Pokemon.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonId: number = 0
  pokemon = new PokemonModel()

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap(value => this.pokemonService.getById(value.id))
    ).subscribe(
      result => {
        this.pokemon = result
      },
      error => {
        console.log("Erro")
      }
    )
  }

  getPokemon = () => {
    this.pokemonService.getById(this.pokemonId)
  }

  getSequenceOfNumbers(n: any): Array<number> {
    return Array(n);
  }

}
