import {Component, Input, OnInit} from '@angular/core';
import {PopoverController} from "@ionic/angular";
import {Base} from "../../../../base/Base";
import {BackendService} from "../../../../services/backend.service";


@Component({
     selector   : 'app-popover-show-more',
     templateUrl: './show-more.component.html',
     styleUrls  : ['./show-more.component.scss'],
})
export class ShowMoreComponent extends Base implements OnInit
{
     @Input() pageType:string;





     constructor(public popoverController:PopoverController,
                 public backendService:BackendService)
     {
          super();
     }





     ngOnInit()
     {
     }





     public close(value):void
     {
          this.popoverController.dismiss({clicked: value}, "completed");
     }
}
