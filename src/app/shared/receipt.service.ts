import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReceiptService {
    data: boolean;
    // dataChange: Observable<any>;

    constructor() {
        // this.dataChange = new Observable((observer: Observer) {
        //     this.dataChange = observer;
        // });
        this.setData(false);
    }

    setData(data: boolean) {
        this.data = data;
        // this.dataChange.next(this.data);
    }
}
