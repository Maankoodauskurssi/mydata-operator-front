import { Component } from '@angular/core';
import * as api from '../mydata-operator-service-client';


@Component({
    selector: 'navbar',
    templateUrl: './servicedescription.component.html',
    providers: [api.DefaultApi]
})
export class ServiceDescriptionPage {
    response: any;
    errorMessage: String;

    serviceSources: Consent[] = [{
        dataSourceName: 'Väestörekisterikeskus',
        category: 'Henkilotiedot',
        icon: '/assets/vrk_logo.png',
        shareState: false
    }, {
        dataSourceName: 'Helsingin energia',
        category: 'Kulutustiedot',
        icon: '/assets/helen_logo.png',
        shareState: false
    }, {
        dataSourceName: 'Kesko',
        category: 'Ostotiedot',
        icon: '/assets/kesko_logo.png',
        shareState: false
    }, {
        dataSourceName: 'St1',
        category: 'Ostotiedot',
        icon: '/assets/st1_logo.png',
        shareState: false
    }];

    constructor(private _api: api.DefaultApi) {
    }

    getSourcesByCategory(category: string) {
        return this.serviceSources.filter(consent => category == consent.category);
    }

    submitConsent() {
        var header: api.Header = {
            version: '1',
            jurisdiction: '',
            iat: 1,
            moc: '',
            jti: '',
            publicKey: '',
            policyUrl: '',
            sub: '',
            sensitive: true,
            spiCat: []
        },
            dataController: api.DataController = {
                onBehalf: false,
                contact: '',
                org: '',
                address: '',
                email: '',
                phone: ''
            },
            services: api.Services = [{
                serviceName: '',
                purposes: [{
                    purpose: 'I dont know :(',
                    consentType: '',
                    purposeCategory: [''],
                    piiCategory: [''],
                    nonCorePurpose: true,
                    purposeTermination: '',
                    thirdPartyDisclosure: true,
                    thirdPartyName: ''
                }]
            }],
            req: api.Request = {
                dataController: dataController,
                header: header,
                services: services
            };

        var requests = new Array<api.Request>(req);

        this.serviceSources.forEach(consent => {
            // TODO: create observable array instead
            this._api.consentRequestPost(requests).subscribe(
                response => this.response = response,
                error => this.errorMessage = <any>error
            )
        });

    }
}

interface Consent {
    dataSourceName?: string,
    category?: string,
    icon?: string,
    shareState?: boolean
}
