import {BaseAddEdit} from "./BaseAddEdit";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowAlertService} from "../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../Arrow/services/loader/arrow-loader.service";
import {VOError} from "../vo/VOError";
import {ArrowNavigationService} from "../Arrow/services/navigation/arrow-navigation.service";
import {BackendService} from "../services/backend.service";
import {ArrowToastService} from "../Arrow/services/toast/arrow-toast.service";
import {OnDestroy, OnInit} from "@angular/core";


export class BaseList extends BaseAddEdit implements OnInit, OnDestroy
{
     constructor(router:Router,
                 route:ActivatedRoute,
                 navController:ArrowNavigationService,
                 alertService:ArrowAlertService,
                 loaderService:ArrowLoaderService,
                 backendService:BackendService,
                 public toastService:ArrowToastService)
     {
          super(router, route, navController, alertService, loaderService, backendService);
     }





     ngOnInit()
     {
     }





     ngOnDestroy():void
     {
     }





     deleteItem(item:any, handler?:Function):void
     {
          super.deleteItem(item, (value) => {

               if (value)
               {
                    this.loaderService.show()
                            .then(() => this.backendService.deleteItem(this.itemType, item))
                            .then(() => handler && handler())
                            .catch((error:VOError) => this.alertService.error(error.msg))
                            .finally(() => this.loaderService.hide());
               }
          });
     }





     public onReorderItems(items:any[], ev)
     {
          let draggedItem = items.splice(ev.detail.from, 1)[0];

          items.splice(ev.detail.to, 0, draggedItem);

          ev.detail.complete();


          // save re-order
          this.toastService.save("Want to save your order!", async () => {

               try
               {
                    await this.loaderService.show();
                    await this.backendService.saveOrder();

                    this.toastService.show("Order saved.");
               }
               finally
               {
                    await this.loaderService.hide();
               }
          });
     }
}
