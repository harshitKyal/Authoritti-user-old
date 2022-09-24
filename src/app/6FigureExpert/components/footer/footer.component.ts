import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageService} from "../../services/page.service";
import {Base} from "../../../base/Base";
import {EnumPage} from "../../../enums/Enums";
import {BackendService} from "../../../services/backend.service";


@Component({
     selector   : 'comp-footer',
     templateUrl: './footer.component.html',
     styleUrls  : ['./footer.component.scss'],
})
export class FooterComponent extends Base implements OnInit
{
     @Input() hasNextPrevious:boolean = true;
     @Input() disable:boolean = false;

     @Output() eventPrevious:EventEmitter<any> = new EventEmitter();
     @Output() eventNext:EventEmitter<boolean> = new EventEmitter();


     public showPrevious:boolean;
     public showNext:boolean;
     public showSubmit:boolean;
     public copyRightDate:string;





     constructor(public pageService:PageService,
                 public backendService:BackendService)
     {
          super();
     }





     ngOnInit()
     {
          this.showPrevious = !this.pageService.isFirstPage;


          if (this.pageService.nextPage && this.pageService.nextPage.type != EnumPage.REPORT)
          {
               this.showNext = true;
          }
          else if (this.pageService.currentPage && this.pageService.currentPage.type != EnumPage.REPORT)
          {
               this.showSubmit = true;
          }


          this.copyRightDate = this.dataManager.getCopyRightData();
     }
}
