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
import { UserLandingPage } from './app/user/userlandingpage.component'
import { UserNavbarComponent } from './app/user/usernavbar.component'
import { ServiceDescriptionPage } from './app/services/servicedescription.component'
import { UserConsentsPage } from './app/user/userconsents.component'
import {UserDatasourcesPage} from "./app/user/userdatasources.component";

@NgModule({
    bootstrap: [App],
    declarations: [App, NavbarComponent, LandingPage, DeveloperLandingPage, DevNavbarComponent, DevloperAppsListComponent, UserLandingPage, UserNavbarComponent, ServiceDescriptionPage, UserConsentsPage, UserDatasourcesPage],
    imports: [
        UniversalModule, // NodeModule, NodeHttpModule, and NodeJsonpModule are included
        FormsModule,
        NgbModule,
        RouterModule.forRoot([
            { path: '', component: LandingPage, pathMatch: 'full' },
            {
                path: 'kuluttaja',
                children: [
                    { path: '', component: UserLandingPage, pathMatch: 'full' },
                    { path: 'luvat', component: UserConsentsPage, pathMatch: 'full' },
                    { path: 'tietolähteet', component: UserDatasourcesPage, pathMatch: 'full' }
                ]
            },
            { path: 'palvelukuvaus/wwf', component: ServiceDescriptionPage, pathMatch: 'full' },
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
