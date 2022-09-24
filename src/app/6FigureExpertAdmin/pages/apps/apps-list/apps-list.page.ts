import {Component} from '@angular/core';
import {BaseList} from '../../../../base/BaseList';
import {ActivatedRoute, Router} from '@angular/router';
import {ArrowNavigationService} from '../../../../Arrow/services/navigation/arrow-navigation.service';
import {ArrowAlertService} from '../../../../Arrow/services/alert/arrow-alert.service';
import {ArrowLoaderService} from '../../../../Arrow/services/loader/arrow-loader.service';
import {BackendService} from '../../../../services/backend.service';
import {EnumField, EnumType} from '../../../../enums/Enums';
import {ArrowToastService} from '../../../../Arrow/services/toast/arrow-toast.service';
import {map} from "rxjs/operators";
import {VOApp} from "../../../../vo/VOApp";
import {Observable} from "rxjs";


@Component({
     selector   : 'app-apps-list',
     templateUrl: './apps-list.page.html',
     styleUrls  : ['./apps-list.page.scss'],
})
export class AppsListPage extends BaseList
{
     public apps$:Observable<VOApp[]>;





     constructor(router:Router,
                 route:ActivatedRoute,
                 navController:ArrowNavigationService,
                 alertService:ArrowAlertService,
                 loaderService:ArrowLoaderService,
                 backendService:BackendService,
                 toastService:ArrowToastService)
     {
          super(router, route, navController, alertService, loaderService, backendService, toastService);
     }





     ngOnInit()
     {
          super.ngOnInit();


          this.itemType = EnumType.App;
          this.apps$ = this.route.data
                  .pipe(
                          map((data) => data[EnumField.APPS])
                  );
     }





     public onShowAppData(app:any):void
     {
          this.backendService.currentApp = app;


          this.navController.forward('', {id: app.url});
     }
}
