/**
 * MyData operator api
 * No descripton provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.1 Maankoodauskurssi
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class DefaultApi {
    protected basePath = 'http://localhost:8000/api';
    public defaultHeaders : Headers = new Headers({"Content-Type":"application/json"});

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     *
     * Gets full information about the consent receipt and its status, determined by the consentId parameter.
     * @param consentId Id of the consent receipt.
     */
    public consentReceiptConsentIdGet (consentId: string, extraHttpRequestParams?: any ) : Observable<string> {
        const path = this.basePath + '/consent/receipt/{consentId}'
            .replace('{' + 'consentId' + '}', String(consentId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'consentId' is not null or undefined
        if (consentId === null || consentId === undefined) {
            throw new Error('Required parameter consentId was null or undefined when calling consentReceiptConsentIdGet.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     *
     * Gets detailed consent receipt data.
     * @param subjectId Id of the consent subject (the data owner)
     */
    public consentReceiptGet (subjectId: string, extraHttpRequestParams?: any ) : Observable<models.Receipt> {
        const path = this.basePath + '/consent/receipt';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'subjectId' is not null or undefined
        if (subjectId === null || subjectId === undefined) {
            throw new Error('Required parameter subjectId was null or undefined when calling consentReceiptGet.');
        }
        if (subjectId !== undefined) {
            queryParameters.set('subjectId', String(subjectId));
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     *
     * Creates a new consent receipt.
     */
    public consentReceiptPost (extraHttpRequestParams?: any ) : Observable<string> {
        const path = this.basePath + '/consent/receipt';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     *
     * Creates a new request for a consent.
     * @param request An array of consents linked to the same consent request.
     */
    public consentRequestPost (request: any, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/consent/request';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'request' is not null or undefined
        if (request === null || request === undefined) {
            throw new Error('Required parameter request was null or undefined when calling consentRequestPost.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(request);
        console.log("tester" + JSON.stringify(request));

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     *
     * Gets detailed consent request information, defined by consent ID.
     * @param requestId The request Id.
     */
    public consentRequestRequestIdGet (requestId: string, extraHttpRequestParams?: any ) : Observable<models.Request> {
        const path = this.basePath + '/consent/request/{requestId}'
            .replace('{' + 'requestId' + '}', String(requestId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'requestId' is not null or undefined
        if (requestId === null || requestId === undefined) {
            throw new Error('Required parameter requestId was null or undefined when calling consentRequestRequestIdGet.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

}
