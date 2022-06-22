import { Component, OnInit } from '@angular/core';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pokedex';
  loading: boolean = false
  subscription = new Subscription()
  private _showLoaderEvents$!: Observable<boolean>
  private _hideLoaderEvents$!: Observable<boolean>;

  constructor(private router: Router) { }

  ngOnInit() {
    this._showLoaderEvents$ = this.router.events.pipe(
      filter(event => event instanceof ResolveStart),
      mapTo(true)
    )
    this._hideLoaderEvents$ = this.router.events.pipe(
      filter(event => event instanceof ResolveEnd),
      mapTo(false)
    )
    this.subscription = merge(this._showLoaderEvents$, this._hideLoaderEvents$)
      .subscribe(result => this.loading = result)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
