import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { App } from './app/app';
import { NavbarComponent } from './app/navbar.component'
import { LandingPage } from './app/landingpage.component'
import { DeveloperLandingPage } from './app/developer/devlandingpage.component'
import { DevNavbarComponent } from './app/developer/devnavbar.component'
import { DevloperAppsListComponent } from './app/developer/devapps.component'

@NgModule({
    bootstrap: [App],
    declarations: [App, NavbarComponent, LandingPage, DeveloperLandingPage, DevNavbarComponent, DevloperAppsListComponent],
    imports: [
        UniversalModule, // BrowserModule, HttpModule, and JsonpModule are included
        FormsModule,
        NgbModule,
        RouterModule.forRoot([
            { path: '', component: LandingPage, pathMatch: 'full' },
            {
                path: 'developer',
                children: [
                    { path: '', component: DeveloperLandingPage, pathMatch: 'full' },
                    { path: 'myapps', component: DevloperAppsListComponent, pathMatch: 'full' }
                ]
            }
        ])
    ]
})
export class MainModule {

}
