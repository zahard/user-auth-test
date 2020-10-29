import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { isUserLoggedin } from '@store/selectors/user.selector';
import { Observable } from 'rxjs';
import { logout } from '@store/actions/user.actions';
import { loaderSelector } from '@store/selectors/loader.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoading = this.store.select(loaderSelector);
  isUserLoggedIn: Observable<boolean>;

  constructor(
    private store: Store,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
  ) {
    const icons = ['lock', 'lock_open', 'signin'];
    icons.forEach(icon =>
      iconRegistry.addSvgIcon(icon, sanitizer.bypassSecurityTrustResourceUrl(`assets/img/${icon}.svg`))
    );

    this.isUserLoggedIn = this.store.select(isUserLoggedin);
  }

  logout() {
    this.store.dispatch(logout());
  }

}
