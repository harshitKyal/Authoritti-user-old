import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalController, PopoverController} from "@ionic/angular";
import {ShowMoreComponent} from "../popovers/show-more/show-more.component";
import {ArrowNavigationService} from "../../../Arrow/services/navigation/arrow-navigation.service";
import {BackendService} from "../../../services/backend.service";
import {PlayVideoComponent} from "../popovers/play-video/play-video.component";


declare var introJs;


@Component({
     selector   : 'comp-header',
     templateUrl: './header.component.html',
     styleUrls  : ['./header.component.scss'],
})
export class HeaderComponent implements OnInit
{
     @Input() title:string;
     @Input() pageType:string;
     @Input() showHome:boolean;
     @Input() showMore:boolean;
     @Input() showReset:boolean;
     @Input() showSave:boolean;

     @Output() eventHome:EventEmitter<any> = new EventEmitter();
     @Output() event:EventEmitter<any> = new EventEmitter();





     constructor(public popoverController:PopoverController,
                 public navController:ArrowNavigationService,
                 public backendService:BackendService,
                 public modalController:ModalController)
     {
     }





     ngOnInit():void
     {
          if (window.innerWidth <= 767)
          {
               return;
          }


          setTimeout(() => {

               if (this.showSave)
               {
                    let intro = introJs();

                    intro.setOptions({
                         showStepNumbers: false,
                         showBullets    : false,
                         steps          : [
                              {
                                   element: '#save',
                                   intro  : 'Click this icon to save your results into a PDF document.',
                              }
                         ]
                    });

                    intro.start();
               }

          }, 1000);
     }





     async onShowMore(ev:any)
     {
          const popover = await this.popoverController.create({
               component     : ShowMoreComponent,
               componentProps: {pageType: this.pageType},
               event         : ev,
               translucent   : true
          });


          popover.onWillDismiss()
                  .then((value) => {

                       if (!value.data)
                       {
                            return;
                       }


                       switch (value.data["clicked"])
                       {
                            case "home":
                                 this.eventHome.emit();
                                 break;


                            case "playVideo":
                                 this.playVideo();
                                 break;


                            case "reset":
                            case "save":
                                 this.event.emit();
                                 break;
                       }
                  });


          return await popover.present();
     }





     public playVideo():void
     {
          this.modalController
                  .create({
                       component: PlayVideoComponent,
                       cssClass : 'gVideoPlayerModal'
                  })
                  .then((modal) => modal.present());
     }
}
