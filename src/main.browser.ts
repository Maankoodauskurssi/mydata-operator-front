import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { App } from './app/app';
import { NavbarComponent } from './app/navbar.component'
import { LandingPage } from './app/landingpage.component'
import { DevLandingPage } from './app/devlandingpage.component'
import { DataSourceLandingPage } from './app/datalandingpage.component'

import { DeveloperLandingPage } from './app/developer/devlandingpage.component'
import { DevNavbarComponent } from './app/developer/devnavbar.component'
import { DevloperAppsListComponent } from './app/developer/devapps.component'
import { DevloperTestbenchComponent } from './app/developer/devtestbench.component'
import { DevloperAppConfigComponent } from './app/developer/devappconfig.component'

import { UserLandingPage } from './app/user/userlandingpage.component'
import { UserNavbarComponent } from './app/user/usernavbar.component'
import { ServiceDescriptionPage } from './app/services/servicedescription.component'
import { UserConsentsPage } from './app/user/userconsents.component'
import { UserDatasourcesPage } from "./app/user/userdatasources.component";

import { DatasourceNavbarComponent } from "./app/datasource/datasourcenavbar.component";
import { DatasourceLandingPage } from "./app/datasource/datasourcelandingpage.component";
import { DatasourceApiListComponent } from "./app/datasource/datasourceapilist.component";
import { DatasourceShopComponent } from "./app/datasource/datasourceshop.component";

import {DevShopConsentsPage} from "./app/developer/devshopconsents.component";

import { ReceiptService } from './app/shared/receipt.service'

@NgModule({
    bootstrap: [App],
    providers: [ReceiptService],
    declarations: [App, NavbarComponent, LandingPage, DeveloperLandingPage, DevNavbarComponent, DevloperAppsListComponent,
        UserLandingPage, UserNavbarComponent, ServiceDescriptionPage, UserConsentsPage, DevLandingPage, DataSourceLandingPage, UserDatasourcesPage,
        DevloperTestbenchComponent, DatasourceLandingPage, DatasourceApiListComponent, DatasourceShopComponent, DatasourceNavbarComponent,
        DevloperAppConfigComponent,DevShopConsentsPage],
    imports: [
        UniversalModule, // BrowserModule, HttpModule, and JsonpModule are included
        FormsModule,
        NgbModule,
        RouterModule.forRoot([
            { path: '', component: LandingPage, pathMatch: 'full' },
            { path: 'dev', component: DevLandingPage, pathMatch: 'full' },
            { path: 'data', component: DataSourceLandingPage, pathMatch: 'full' },
            {
                path: 'kuluttaja',
                children: [
                    { path: '', component: UserLandingPage, pathMatch: 'full' },
                    { path: 'luvat', component: UserConsentsPage, pathMatch: 'full' },
                    { path: 'tietolähteet', component: UserDatasourcesPage, pathMatch: 'full' }
                ]
            },
            { path: 'palvelukuvaus/transposmart', component: ServiceDescriptionPage, pathMatch: 'full' },
            {
                path: 'developer',
                children: [
                    { path: '', component: DeveloperLandingPage, pathMatch: 'full', redirectTo: 'appsit' },
                    { path: 'appsit', component: DevloperAppsListComponent, pathMatch: 'full' },
                    { path: 'testipenkki', component: DevloperTestbenchComponent, pathMatch: 'full' },
                    { path: 'transposmart', component: DevloperAppConfigComponent, pathMatch: 'full' },
                    { path: 'kauppa', component: DevShopConsentsPage, pathMatch: 'full' }
                ]
            },
            {
                path: 'datasource',
                children: [
                    { path: '', component: DatasourceLandingPage, pathMatch: 'full', redirectTo: 'apit' },
                    { path: 'apit', component: DatasourceApiListComponent, pathMatch: 'full' },
                    { path: 'kauppa', component: DatasourceShopComponent, pathMatch: 'full' }
                ]
            }
        ])
    ]
})
export class MainModule {

}
