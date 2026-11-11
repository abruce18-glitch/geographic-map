import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  // Step D. Configures automatic routing to the main component
  {path: 'main', component: MainComponent },
  {path: '', redirectTo:'/main', pathMatch:'full' }
];
