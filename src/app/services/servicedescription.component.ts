import { Component, OnInit } from '@angular/core';
import * as api from '../mydata-operator-service-client';
import { ReceiptService } from '../shared/receipt.service';

@Component({
    selector: 'navbar',
    templateUrl: './servicedescription.component.html',
    styleUrls: ['./servicedescription.component.css'],
    providers: [api.DefaultApi]
})
export class ServiceDescriptionPage implements OnInit {
    response: any;
    errorMessage: String;

    serviceSources: Consent[] = [{
        dataSourceName: 'Trafi',
        category: 'Liikenne',
        icon: '/assets/liikenteen-turvallisuusvirasto-tra-fi-logo-copy.png',
        shareState: true
    }, {
        dataSourceName: 'Helsingin seudun liikenne',
        category: 'Liikenne',
        icon: '/assets/hsl.png',
        shareState: true
    }, {
        dataSourceName: 'Scandinavian Airlines',
        category: 'Liikenne',
        icon: '/assets/2000-px-scandinavian-airlines-logosvg.png',
        shareState: true
    }, {
        dataSourceName: 'St1',
        category: 'Liikenne',
        icon: '/assets/st-1-logo-web-2.png',
        shareState: true
    }];

    constructor(private _api: api.DefaultApi, private _receiptService: ReceiptService) {
    }

    ngOnInit() {
        if (this._receiptService.data == true) {
            this.serviceSources.push({
                dataSourceName: 'Valtion Rautatiet',
                category: 'Liikenne',
                icon: '/assets/v-r-icon-copy.png',
                shareState: false
            });
        }
    }

    getSourcesByCategory(category: string) {
        return this.serviceSources.filter(consent => category == consent.category);
    }

    submitConsent() {
        // consent specification header

        //var requests = new Array<api.Request>(req);

        var uuid = require('node-uuid');

        this.serviceSources.filter(consent => isApproved(consent)).forEach(consent => {
            // TODO: create observable array instead

            var header: api.Header = {
                    version: '1',
                    jurisdiction: 'fi',
                    iat: 1,
                    moc: 'automatic.app.request',
                    jti: uuid.v4(), // unique receipt id, generate?
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

            console.log("consent db" + consent.dataSourceName + " foo");
            this._api.consentRequestPost(req).subscribe(
                response => this.response = response,
                error => this.errorMessage = <any>error
            )
        });

        if (this.errorMessage == null) {
            document.getElementById("questionaire").style.display = "none";
            document.getElementById("answerblock").style.display = "block";
        } else {
            console.log(" error " + this.errorMessage);
        }

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
