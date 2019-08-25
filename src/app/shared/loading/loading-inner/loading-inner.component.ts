import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../loading.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-loading-inner',
  templateUrl: './loading-inner.component.html',
  styleUrls: ['./loading-inner.component.css']
})
export class LoadingInnerComponent implements OnInit {

  @Input() innerText = '';
  img = '../../assets/img/ajax-loader.gif';

  loading$: Observable<string>;

  constructor(private loadingService: LoadingService) {}
  
  ngOnInit() {
    this.loading$ = this.loadingService
        .getLoadingInner()
        .pipe(map(loadingType => loadingType.valueOf()))
  }

}
