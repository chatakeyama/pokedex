import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() message: string = ''

  errorMessage: string = ''
  constructor() { }

  ngOnInit(): void {
    this.errorMessage = this.message
  }

}
