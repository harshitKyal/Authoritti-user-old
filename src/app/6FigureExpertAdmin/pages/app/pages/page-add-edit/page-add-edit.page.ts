import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EnumField, EnumPage, EnumRoute, EnumType} from "../../../../../enums/Enums";
import {FormBuilder} from "@angular/forms";
import {VOPage} from "../../../../../vo/VOPage";
import {ArrowAlertService} from "../../../../../Arrow/services/alert/arrow-alert.service";
import {BaseAddEditForm} from "../../../../../base/BaseAddEditForm";
import {BackendService} from "../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowNavigationService} from "../../../../../Arrow/services/navigation/arrow-navigation.service";


@Component({
     selector   : 'app-page-add-edit',
     templateUrl: './page-add-edit.page.html',
     styleUrls  : ['./page-add-edit.page.scss'],
})
export class PageAddEditPage extends BaseAddEditForm implements OnInit
{
     public page:VOPage;





     constructor(router:Router,
                 route:ActivatedRoute,
                 navController:ArrowNavigationService,
                 alertService:ArrowAlertService,
                 loaderService:ArrowLoaderService,
                 backendService:BackendService,
                 formBuilder:FormBuilder)
     {
          super(router, route, navController, alertService, loaderService, backendService, formBuilder);
     }





     ngOnInit()
     {
          this.page = this.route.snapshot.data[EnumField.PAGE_INFO];


          this.itemType = EnumType.Page;
          this.itemName = EnumType[EnumType.Page];


          let routeBackOnEdit:string;
          switch (this.page.type)
          {
               case EnumPage.INTRO:
                    routeBackOnEdit = EnumRoute.INTRO_DETAIL;
                    break;


               case EnumPage.QUESTIONNAIRE:
                    routeBackOnEdit = EnumRoute.QUESTIONNAIRE_DETAIL;
                    break;


               case EnumPage.QUESTIONNAIRE_DYNAMIC:
                    routeBackOnEdit = EnumRoute.QUESTIONNAIRE_DYNAMIC_DETAIL;
                    break;


               case EnumPage.REPORT:
                    routeBackOnEdit = EnumRoute.REPORT_DETAIL;
                    break;


               case EnumPage.SECTION:
                    routeBackOnEdit = "Skip";
                    break;
          }


          this.routeBackOnAdd = `${this.navController.root}/${EnumRoute.PAGES}`;
          this.routeBackOnEdit = `${this.navController.root}/${EnumRoute.PAGES}/${routeBackOnEdit}/${this.page.auid}`;
          this.routeBackOnDelete = this.routeBackOnAdd;
          this.routeBack = this.page.auid ? this.routeBackOnEdit : this.routeBackOnAdd;


          this.title = this.page.auid ? 'Edit Page' : 'New Page';


          if (this.page.type == EnumPage.SECTION)
          {
               this.routeBackOnEdit = this.routeBackOnAdd;
               this.routeBack = this.routeBackOnAdd;
          }
     }
}
