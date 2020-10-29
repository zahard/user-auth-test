import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ]
})
export class MaterialModule { }
