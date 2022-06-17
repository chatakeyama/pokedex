import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonModel } from '../../models/Pokemon.model';

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
  messageError: string = ''

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pokemonId = this.route.snapshot.params['id']
    this.getPokemonInfo(this.pokemonId)
  }

  getPokemonInfo = (id: number): void => {
    this.pokemonService.getById(id).subscribe(
      result => {
        this.stopLoading()
        this.pokemon = result
      },
      this.handleGetPokemonByIdError)
  }

  getSequenceOfNumbers(n: any): Array<number> {
    return Array(n);
  }

  removePokemon = (): void => {
    this.pokemonService.delete(this.pokemonId).subscribe(
      result => {
        this.toastr.success('Pokémon removido com sucesso.')
        this.router.navigate(['/list'])
      }, error => {
        this.toastr.error('Não foi possível deletar. Tente novamente mais tarde.')
      }
    )
  }

  editPokemon = (): void => {
    this.router.navigate([`/edit/${this.pokemonId}`])
  }

  stopLoading = (): void => {
    this.loading = false
  }

  handleGetPokemonByIdError = (error: any) => {
    this.stopLoading()
    this.serverError = true
    if (error.status === 404) {
      this.messageError = 'Pokémon não encontrado.'
    } else {
      this.messageError = 'Falha na comunicação com o servidor.'
    }
  }

}
