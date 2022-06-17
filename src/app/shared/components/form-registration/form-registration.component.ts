import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IPokemon } from '../../interfaces/IPokemon.interface';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss']
})
export class FormRegistrationComponent implements OnInit {

  title: string = 'Cadastrar pokémon'
  pokemonModel = {} as IPokemon
  loading: boolean = false
  pokemonId: number = 0
  serverError: boolean = false
  messageError: string = ''
  subscription = new Subscription()

  registrationForm = new FormGroup({
    nome: new FormControl(this.pokemonModel.nome, [
      Validators.required, Validators.minLength(2)]),
    descricao: new FormControl(this.pokemonModel.descricao, Validators.required),
    altura: new FormControl(this.pokemonModel.altura, Validators.required),
    peso: new FormControl(this.pokemonModel.peso, Validators.required),
    categoria: new FormControl(this.pokemonModel.categoria, Validators.required),
    habilidade: new FormControl(this.pokemonModel.habilidade, Validators.required),
    ataque: new FormControl(this.pokemonModel.ataque, Validators.required),
    defesa: new FormControl(this.pokemonModel.defesa, Validators.required),
    velocidade: new FormControl(this.pokemonModel.velocidade, Validators.required),
  });

  constructor(
    private pokemonService: PokemonService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pokemonId = this.route.snapshot.params['id']
    if (this.pokemonId) {
      this.title = 'Editar pokémon'
      this.getPokemon(this.pokemonId);
    }

  }

  get nome() { return this.registrationForm.get('nome') }
  get descricao() { return this.registrationForm.get('descricao') }
  get altura() { return this.registrationForm.get('altura') }
  get peso() { return this.registrationForm.get('peso') }
  get categoria() { return this.registrationForm.get('categoria') }
  get habilidade() { return this.registrationForm.get('habilidade') }
  get ataque() { return this.registrationForm.get('ataque') }
  get defesa() { return this.registrationForm.get('defesa') }
  get velocidade() { return this.registrationForm.get('velocidade') }

  getPokemon(id: number): void {
    this.loading = true
    this.subscription = this.pokemonService.getById(this.pokemonId)
      .subscribe(result => {
        this.stopLoading()
        this.pokemonModel = result
        this.registrationForm.patchValue(this.pokemonModel)
      },
      this.handleGetPokemonByIdError)
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

  create = (): void => {
    this.pokemonService.add(this.registrationForm.value).subscribe(() => {
      this.onSuccess('Pokémon cadastrado com sucesso.')
    },
      () => {
        this.handleCreateOrUpdateError('Não foi possível fazer o cadastro.')
      }
    )
  }

  update = (): void => {
    this.registrationForm.value.id = this.pokemonId
    this.pokemonService.update(this.registrationForm.value).subscribe(() => {
      this.onSuccess('Pokémon editado com sucesso.')
    },
      () => {
        this.handleCreateOrUpdateError('Não foi possível fazer a edição.')
      }
    )
  }

  onSuccess = (message: string) => {
    this.stopLoading()
    this.toastr.success(message)
    this.goToListPage()
  }

  goToListPage = () => {
    this.router.navigate(['/list'])
  }

  handleCreateOrUpdateError = (message: string) => {
    this.stopLoading()
    this.toastr.error(message)
  }

  onSubmit = (): void => {
    this.loading = true
    if (this.pokemonId) {
      this.update()
    } else {
      this.create()
    }
  }

  stopLoading = (): void => {
    this.loading = false
  }

  onNgDestroy() {
    this.subscription.unsubscribe()
  }
}
