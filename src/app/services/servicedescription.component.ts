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

    constructor(private _api: api.DefaultApi) {
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
                purposes: [{
                    purpose: 'To calculate your traffic behaviour impact to the environment, we need to know your traffic related costs',
                    consentType: 'explicit',
                    policyUrl: 'http://www.wwf.org/ecoapp/privacypolicy.html',
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

        this._api.consentRequestPost(requests).subscribe(
            response => this.response = response,
            error => this.errorMessage = <any>error
        )
    }
}

