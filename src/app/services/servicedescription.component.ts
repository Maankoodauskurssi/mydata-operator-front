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
        dataSourceName: 'Trafi',
        category: 'Henkilotiedot',
        icon: '/assets/vrk_logo.png',
        shareState: false
    }, {
        dataSourceName: 'Helsingin seudun liikenne',
        category: 'Paikkatiedot',
        icon: '/assets/helen_logo.png',
        shareState: false
    }, {
        dataSourceName: 'SAS',
        category: 'Kulutustiedot',
        icon: '/assets/kesko_logo.png',
        shareState: false
    }, {
        dataSourceName: 'St1',
        category: 'Kulutustiedot',
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

        //var requests = new Array<api.Request>(req);

        this.serviceSources.filter(consent => isApproved(consent)).forEach(consent => {
            // TODO: create observable array instead

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
                    spiCat: [consent.category]
                },
                dataController: api.DataController = {
                    onBehalf: false,
                    contact: 'support@test.fi',
                    org: consent.dataSourceName,
                    address: 'Testitie 1, Postimaa',
                    email: 'contact@test.com',
                    phone: '12345667890'
                },
                services: api.Services = [{
                    serviceName: 'Transpostmart',
                    policyUrl: 'http://www.tpm.org/privacypolicy.html',
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

            console.log("consent db" + consent.dataSourceName+" foo");
            this._api.consentRequestPost(req).subscribe(
                response => this.response = response,
                error => this.errorMessage = <any>error
            )
        });

    }
}

function isApproved(consent) {
    return consent.shareState;
}


interface Consent {
    dataSourceName?: string,
    category?: string,
    icon?: string,
    shareState?: boolean
}
