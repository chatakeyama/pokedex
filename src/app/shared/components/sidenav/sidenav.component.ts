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
  navigationConfigList = [
    { route: '/list', label: 'Consultar', icon: 'receipt' },
    { route: '/add', label: 'Adicionar', icon: 'add' }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo = (event: any): void => {
    const route = this.navigationConfigList[event.index].route
    this.router.navigate([route])
  }

  getCurrentRouteIndex = (): number => {
    return this.navigationConfigList.findIndex(r => r.route === this.router.url)
  }
}
