import {Component, OnInit} from '@angular/core';
import {BackendService} from "../../../../services/backend.service";
import {EmbedVideoService} from "ngx-embed-video";
import {VOPage} from "../../../../vo/VOPage";


@Component({
     selector   : 'comp-play-video',
     templateUrl: './play-video.component.html',
     styleUrls  : ['./play-video.component.scss'],
})
export class PlayVideoComponent implements OnInit
{
     public page:VOPage;
     public iframeHTML:any;





     constructor(public backendService:BackendService,
                 public embedService:EmbedVideoService)
     {
     }





     ngOnInit()
     {
          this.page = this.backendService.curIntroPage;


          if (this.page && this.page.intro.video_link)
          {
               this.iframeHTML = this.embedService.embed(this.page.intro.video_link);
          }
     }
}
