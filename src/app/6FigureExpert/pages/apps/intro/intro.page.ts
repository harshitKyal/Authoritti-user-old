import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../services/page.service";
import {EmbedVideoService} from "ngx-embed-video/dist";
import {BackendService} from "../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {BasePageDynamic} from "../../../base/BasePageDynamic";


@Component({
     selector   : 'app-intro',
     templateUrl: './intro.page.html',
     styleUrls  : ['./intro.page.scss'],
})
export class IntroPage extends BasePageDynamic
{
     public iframeHTML:any;





     constructor(route:ActivatedRoute,
                 navController:ArrowNavigationService,
                 pageService:PageService,
                 backendService:BackendService,
                 loaderService:ArrowLoaderService,
                 alertService:ArrowAlertService,
                 public embedService:EmbedVideoService)
     {
          super(route, navController, pageService, backendService, loaderService, alertService);
     }





     ngOnInit():void
     {
          super.ngOnInit();


          if (this.page.intro.video_link)
          {
               this.iframeHTML = this.embedService.embed(this.page.intro.video_link, {
                    attr: {width: 425, height: 344}
               });
          }
     }





     onNext(submit?:boolean):void
     {
          if (this.page.intro.video_link)
          {
               let iframe = document.getElementById(this.page.auid)
                       .querySelector('iframe');

               let src = iframe.src;
               iframe.src = '';
               iframe.src = src;
          }


          super.onNext(submit);
     }
}
