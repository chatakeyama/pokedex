import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  events: string[] = []
  opened: boolean = true
  ADD_LABEL = 'Adicionar'
  LIST_LABEL = 'Lista'

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo = (event: any): void => {
    if (event.tab.textLabel === this.ADD_LABEL) {
      this.router.navigate(['/add'])
    } else if (event.tab.textLabel === this.LIST_LABEL) {
      this.router.navigate(['/list'])
    }
  }

  getCurrentRouteIndex = (): number => {
    const routes = ['/add', '/list']
    return routes.findIndex(r => r === this.router.url)
  }
}
