import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  registrationForm = new FormGroup({
    nome: new FormControl(this.pokemonModel.nome, [
      Validators.required, Validators.minLength(4)]),
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
    this.pokemonService.getById(this.pokemonId).subscribe(result => {
      this.pokemonModel = result
      this.registrationForm.patchValue(this.pokemonModel)
    })
  }

  create = (): void => {
    this.pokemonService.add(this.registrationForm.value).subscribe(result => {
      this.stopLoading()
      this.toastr.success('Pokemon cadastrado com sucesso.')
    },
      error => {
        this.stopLoading()
        this.toastr.error('Não foi possível fazer o cadastro.')
      }
    )
    this.goToListPage()
  }

  update = (): void => {
    this.registrationForm.value.id = this.pokemonId
    this.pokemonService.update(this.registrationForm.value).subscribe(result => {
      this.stopLoading()
      this.toastr.success('Pokemon editado com sucesso.')
    },
      error => {
        this.stopLoading()
        this.toastr.error('Não foi possível fazer a edição.')
      }
    )
    this.goToListPage()
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

  goToListPage = () => {
    this.router.navigate(['/list'])
  }

}
