import {Component} from '@angular/core';
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
        // consent specification header
        var header: api.Header = {
                version: '1',
                jurisdiction: 'fi',
                iat: 1,
                moc: 'automatic.app.request',
                jti: '7c80b99e-dff9-4931-b927-bbddc0eec307', // unique receipt id, generate?
                // publicKey: '',
                // policyUrl: '', --> moved to service privacy policy
                // principal id
                sub: 'eppu.esimerkki@eemail.fi',
                sensitive: true,
                // Sensitive PI data category
                spiCat: ['Financial/PurchaseHistory']
            },
            dataController: api.DataController = {
                onBehalf: false,
                contact: 'support@sti.fi',
                org: 'STi',
                address: 'Testitie 1, Postimaa',
                email: 'sti@sti.com',
                phone: '12345667890'
            },
            services: api.Services = [{
                serviceName: 'wwf.ecologinen.jalanjalki',
                policyUrl: 'http://www.wwf.org/ecoapp/privacypolicy.html',
                purposes: [{
                    purpose: 'To calculate your traffic behaviour impact to the environment, we need to know your traffic related costs',
                    consentType: 'explicit',
                    purposeCategory: ['1.core.function'],
                    piiCategory: ['Financial/PurchaseHistory'],
                    nonCorePurpose: false,
                    purposeTermination: 'no-expiry',
                    thirdPartyDisclosure: false
                    //thirdPartyName: ''
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
