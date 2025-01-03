import { NgModule } from '@angular/core';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';

const ABOUT_ROUTES = [
  {
    path: '',
    component: AboutComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(ABOUT_ROUTES)
  ],
  declarations: [AboutComponent],
  exports: [AboutComponent]
})
export class AboutModule {}
