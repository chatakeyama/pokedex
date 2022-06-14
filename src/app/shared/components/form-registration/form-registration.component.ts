import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IPokemon } from '../../interfaces/IPokemon.interface';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss']
})
export class FormRegistrationComponent implements OnInit {

  pokemonModel = {} as IPokemon
  loading: boolean = false

  registrationForm = new FormGroup({
    nomeControl: new FormControl(this.pokemonModel.nome, [
      Validators.required, Validators.minLength(4)]),
    descricaoControl: new FormControl(this.pokemonModel.descricao, Validators.required),
    alturaControl: new FormControl(this.pokemonModel.altura, Validators.required),
    pesoControl: new FormControl(this.pokemonModel.peso, Validators.required),
    categoriaControl: new FormControl(this.pokemonModel.categoria, Validators.required),
    habilidadeControl: new FormControl(this.pokemonModel.habilidade, Validators.required),
    ataqueControl: new FormControl(this.pokemonModel.ataque, Validators.required),
    defesaControl: new FormControl(this.pokemonModel.defesa, Validators.required),
    velocidadeControl: new FormControl(this.pokemonModel.velocidade, Validators.required),
  });

  constructor(
    private pokemonService: PokemonService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
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

  onSubmit = () => {
    this.loading = true
    this.bindDataFormToDataModel()
    this.pokemonService.add(this.pokemonModel).subscribe(result => {
      this.loading = false
      this.toastr.success('Pokemon cadastrado com sucesso')
    },
      error => {
        this.loading = false
        this.toastr.error('Não foi possível fazer o cadastro')
      }
    )
  }

}
