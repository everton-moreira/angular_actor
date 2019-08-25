import { Injectable } from "@angular/core";
import { LoadingType } from "./loading.type";
import { Subject } from "rxjs";
import { startWith } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class LoadingService { 

    loadingSubject = new Subject<LoadingType>();
    loadingInnerSubject = new Subject<LoadingType>();

    getLoading() {
        
        return this.loadingSubject
            .asObservable()
            .pipe(startWith(LoadingType.STOPPED));
    }

    getLoadingInner() {
        
        return this.loadingInnerSubject
            .asObservable()
            .pipe(startWith(LoadingType.STOPPED));
    }

    start() {
        this.loadingSubject.next(LoadingType.LOADING);
    }

    startInner() {
        this.loadingInnerSubject.next(LoadingType.LOADING_INNER);
    }

    stop() {
        this.loadingSubject.next(LoadingType.STOPPED);
        this.loadingInnerSubject.next(LoadingType.STOPPED);
    }    
}