import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { App } from './app/app';
import { NavbarComponent } from './app/navbar.component'
import { LandingPage } from './app/landingpage.component'

@NgModule({
    bootstrap: [App],
    declarations: [App, NavbarComponent, LandingPage],
    imports: [
        UniversalModule, // NodeModule, NodeHttpModule, and NodeJsonpModule are included
        FormsModule,
        NgbModule,
        RouterModule.forRoot([
            { path: '', component: LandingPage, pathMatch: 'full' }
        ])
    ]
})
export class MainModule {

}
