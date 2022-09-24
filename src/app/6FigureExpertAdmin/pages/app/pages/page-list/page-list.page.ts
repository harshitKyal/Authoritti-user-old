import {Component} from '@angular/core';
import {BaseList} from "../../../../../base/BaseList";
import {ArrowAlertService} from "../../../../../Arrow/services/alert/arrow-alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EnumField, EnumPage, EnumRoute, EnumType} from "../../../../../enums/Enums";
import {BackendService} from "../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowNavigationService} from "../../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowToastService} from "../../../../../Arrow/services/toast/arrow-toast.service";
import {VOPage} from "../../../../../vo/VOPage";
import {untilDestroyed} from "ngx-take-until-destroy";


@Component({
     selector   : 'app-list',
     templateUrl: 'page-list.page.html',
     styleUrls  : ['page-list.page.scss']
})
export class PageListPage extends BaseList
{
     public pages:any;





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


          this.itemType = EnumType.Page;


          this.route.data
                  .pipe(untilDestroyed(this))
                  .subscribe((data) => this.pages = data[EnumField.PAGES]);
     }





     public showDetail(page:VOPage):void
     {
          let route:string;


          switch (page.type)
          {
               case EnumPage.INTRO:
                    route = EnumRoute.INTRO_DETAIL;
                    break;


               case EnumPage.QUESTIONNAIRE:
                    route = EnumRoute.QUESTIONNAIRE_DETAIL;
                    break;


               case EnumPage.QUESTIONNAIRE_DYNAMIC:
                    route = EnumRoute.QUESTIONNAIRE_DYNAMIC_DETAIL;
                    break;


               case EnumPage.REPORT:
                    route = EnumRoute.REPORT_DETAIL;
                    break;


               case EnumPage.SECTION:
                    this.navController.forwardWithUrl(EnumRoute.PAGE_EDIT, {id: page.auid, skipUrlCount: 1});
                    return;
          }


          this.navController.forwardWithUrl(route, {id: page.auid, skipUrlCount: 1});
     }





     deleteItem(item:any, handler?:Function):void
     {
          super.deleteItem(item, () => {

               let keys:string[] = Object.keys(this.pages);
               let items:any[];
               let itemPage:any;
               let i:number;
               let found:boolean = false;


               for (let key of keys)
               {
                    items = this.pages[key];
                    i = 0;


                    for (; i < items.length; ++i)
                    {
                         itemPage = items[i];


                         if (item.auid == itemPage.auid)
                         {
                              found = true;
                              break;
                         }
                    }


                    if (found)
                    {
                         items.splice(i, 1);
                         break;
                    }
               }
          });
     }





     onReorderItems(items:any[], ev)
     {
          let draggedItem = items.splice(ev.detail.from, 1)[0];

          items.splice(ev.detail.to, 0, draggedItem);

          ev.detail.complete();


          // above sort is for visual data, 2nd is for backend
          super.onReorderItems(this.backendService.pages, ev);
     }
}
