import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { switchMap } from 'rxjs/operators';
import { PokemonModel } from '../../models/Pokemon.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonId: number = 0
  pokemon = new PokemonModel()
  loading: boolean = true
  serverError: boolean = false

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap(value => this.pokemonService.getById(value.id))
    ).subscribe(
      result => {
        this.loading = false
        this.pokemon = result
        this.pokemonId = result.id
      },
      error => {
        this.loading = false
        this.serverError = true
        this.toastr.error('Não foi possível comunicar-se com o servidor.')
      }
    )
  }

  getSequenceOfNumbers(n: any): Array<number> {
    return Array(n);
  }

  removePokemon = () => {
    this.pokemonService.delete(this.pokemonId).subscribe(
      result => {
        this.toastr.success('Pokémon removido com sucesso.')
        this.router.navigate(['/list'])
      }, error => {
        this.toastr.error('Não foi possível deletar. Tente novamente mais tarde.')
      }
    )
  }

}
