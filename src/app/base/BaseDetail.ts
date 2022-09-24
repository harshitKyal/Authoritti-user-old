import {ActivatedRoute, Router} from '@angular/router';
import {ArrowAlertService} from '../Arrow/services/alert/arrow-alert.service';
import {ArrowLoaderService} from '../Arrow/services/loader/arrow-loader.service';
import {ArrowNavigationService} from '../Arrow/services/navigation/arrow-navigation.service';
import {BackendService} from '../services/backend.service';
import {ArrowToastService} from '../Arrow/services/toast/arrow-toast.service';
import {EnumField, EnumRoute} from '../enums/Enums';
import {VOPage} from '../vo/VOPage';
import {OnDestroy, OnInit} from '@angular/core';
import {BaseAddEdit} from './BaseAddEdit';
import {untilDestroyed} from "ngx-take-until-destroy";


export class BaseDetail extends BaseAddEdit implements OnInit, OnDestroy
{
     public page: VOPage;
     public appTitle: string;





     constructor(router: Router,
                 route: ActivatedRoute,
                 navController: ArrowNavigationService,
                 alertService: ArrowAlertService,
                 loaderService: ArrowLoaderService,
                 backendService: BackendService,
                 public toastService: ArrowToastService)
     {
          super(router, route, navController, alertService, loaderService, backendService);
     }





     ngOnInit()
     {
          this.route.data
                  .pipe(untilDestroyed(this))
                  .subscribe((data) => this.page = data[EnumField.PAGE_INFO]);


          this.routeBack = `${this.navController.root}/${EnumRoute.PAGES}`;
          this.appTitle = this.backendService.currentApp.title;
     }





     ngOnDestroy(): void
     {
     }
}
