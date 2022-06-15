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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokemonId = params['id']
      if (this.pokemonId) {
        this.title = 'Editar pokémon'
        this.getPokemon(this.pokemonId);
      }
    })
  }

  get nome() { return this.registrationForm.get('nomeControl') }
  get descricao() { return this.registrationForm.get('descricaoControl') }
  get altura() { return this.registrationForm.get('alturaControl') }
  get peso() { return this.registrationForm.get('pesoControl') }
  get categoria() { return this.registrationForm.get('categoriaControl') }
  get habilidade() { return this.registrationForm.get('habilidadeControl') }
  get ataque() { return this.registrationForm.get('ataqueControl') }
  get defesa() { return this.registrationForm.get('defesaControl') }
  get velocidade() { return this.registrationForm.get('velocidadeControl') }

  bindDataFormToDataModel = (): void => {
    this.pokemonModel.nome = this.nome?.value
    this.pokemonModel.descricao = this.descricao?.value
    this.pokemonModel.altura = this.altura?.value
    this.pokemonModel.peso = this.peso?.value
    this.pokemonModel.categoria = this.categoria?.value
    this.pokemonModel.habilidade = this.habilidade?.value
    this.pokemonModel.ataque = this.ataque?.value
    this.pokemonModel.defesa = this.ataque?.value
    this.pokemonModel.velocidade = this.velocidade?.value
  }

  getPokemon(id: number) {
    this.pokemonService.getById(this.pokemonId).subscribe(result => {
      this.pokemonModel = result
      this.registrationForm.patchValue(this.pokemonModel)
      console.log( this.registrationForm.value)
    })
  }

  create = () => {
    this.pokemonService.add(this.pokemonModel).subscribe(result => {
      this.loading = false
      this.toastr.success('Pokemon cadastrado com sucesso.')
    },
      error => {
        this.loading = false
        this.toastr.error('Não foi possível fazer o cadastro.')
      }
    )
  }

  update = () => {
    this.registrationForm.value.id = this.pokemonId
    this.pokemonService.update(this.registrationForm.value).subscribe(result => {
      this.loading = false
      this.toastr.success('Pokemon editado com sucesso.')
    },
      error => {
        this.loading = false
        this.toastr.error('Não foi possível fazer a edição.')
      }
    )
  }

  onSubmit = () => {
    this.loading = true
    this.bindDataFormToDataModel()
    if (this.pokemonId) {
      this.update()
    } else {
      this.create()
    }
  }

}
