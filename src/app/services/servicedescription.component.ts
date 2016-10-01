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

    constructor(private _api: api.DefaultApi) {
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

        this._api.consentRequestPost(requests).subscribe(
            response => this.response = response,
            error => this.errorMessage = <any>error
        )
    }
}

