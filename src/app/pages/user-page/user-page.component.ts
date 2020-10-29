import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserProfile } from 'src/app/models/user.model';
import { getUserProfile } from '@store/selectors/user.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnDestroy {
  profile: UserProfile;
  private userSub: Subscription;

  constructor(private store: Store) {
    this.userSub = this.store.select(getUserProfile).subscribe(
      profile => this.profile = profile
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
