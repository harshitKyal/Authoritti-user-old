import {Component} from '@angular/core';
import {BasePageCustom} from "../../../../base/BasePageCustom";
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../../services/page.service";
import {BackendService} from "../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../../Arrow/services/alert/arrow-alert.service";


@Component({
     selector   : 'app-emotions',
     templateUrl: './emotions.page.html',
     styleUrls  : ['./emotions.page.scss'],
})
export class EmotionsPage extends BasePageCustom
{
     public inputEmotion:string;
     public savedPages:any[];


     public emotions:string[] = ["Respect", "Pity", "Love", "Joy", "Hope", "Gratitude", "Freedom", "Faith", "Empathy", "Courage",
                                 "Anger", "Apathy", "Conceit", "Despair", "Doubt", "Envy", "Fear", "Greed", "Guilt", "Hate"];





     constructor(route:ActivatedRoute,
                 navController:ArrowNavigationService,
                 pageService:PageService,
                 backendService:BackendService,
                 loaderService:ArrowLoaderService,
                 alertService:ArrowAlertService)
     {
          super(route, navController, pageService, backendService, loaderService, alertService);
     }





     ngOnInit()
     {
          super.ngOnInit();


          this.inputEmotion = this.page.template.data;
     }





     reset()
     {
          super.reset();


          this.inputEmotion = null;
     }





     public selectEmotion():void
     {
          this.page.template.data = this.inputEmotion;


          if (this.backendService.pages.length == 9)
          {
               // keep original pages
               this.savedPages = [
                    this.backendService.pages[1], // Positive
                    this.backendService.pages[2], // Negative
               ];


               this.backendService.pages.splice(1, 2);
               this.backendService.pagesCount = this.backendService.pages.length - 1; // remove report count
          }


          this.backendService.updateEmotion(this.inputEmotion, this.pageService.nextPage.questionnaire.title);


          super.onNext(false);
     }





     public calculateEmotion():void
     {
          if (this.backendService.pages.length == 7)
          {
               this.backendService.pages.splice(1, 0, ...this.savedPages);
               this.backendService.pagesCount = this.backendService.pages.length - 1; // remove report count
          }


          super.onNext(false);
     }
}
