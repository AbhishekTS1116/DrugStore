import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VieweditpageComponent } from './vieweditpage/vieweditpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UpdatepageComponent } from './updatepage/updatepage.component';

export const routes: Routes = [{
    path:'',
    redirectTo: 'homepage',
    pathMatch:'full'
},
{
    path:'vieweditpage',
    component:VieweditpageComponent,
},

{
    path:'homepage',
    component:HomepageComponent,
},

{

    path:'viewdrug/:_id/update',
    component:UpdatepageComponent,
    
}

];
