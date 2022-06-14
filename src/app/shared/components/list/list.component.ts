import { Component, OnInit } from '@angular/core';

const ELEMENT_DATA: any[] = [
  { id: 1, nome: 'Pikachu', descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed egestas ante, sit amet laoreet risus. Cras vitae elit vitae nunc auctor posuere.' },
  { id: 2, nome: 'Eevee', descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed egestas ante, sit amet laoreet risus. Cras vitae elit vitae nunc auctor posuere.' },
  { id: 3, nome: 'Charizard', descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed egestas ante, sit amet laoreet risus. Cras vitae elit vitae nunc auctor posuere.' },
];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})


export class ListComponent implements OnInit {

  displayedColumns: string[] = ['pokemon-id', 'pokemon-nome', 'pokemon-descricao'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  onClickRow(row: any){
    console.log(row)
  }

}
