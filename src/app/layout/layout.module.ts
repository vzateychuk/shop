import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, AboutComponent, PathNotFoundComponent } from './components';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AboutComponent,
    PathNotFoundComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LayoutModule { }
