import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {
  
  events: string[] = []
  opened: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

}
