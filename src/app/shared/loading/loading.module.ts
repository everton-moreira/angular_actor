import { NgModule } from "@angular/core";
import { LoadingComponent } from "./loading/loading.component";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingInterceptor } from "../../interceptor/loading.service";
import { LoadingInnerComponent } from './loading-inner/loading-inner.component';

@NgModule({
    declarations: [LoadingComponent, LoadingInnerComponent],
    exports: [LoadingComponent, LoadingInnerComponent],
    imports: [CommonModule],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true
    }]
})
export class LoadingModule { }