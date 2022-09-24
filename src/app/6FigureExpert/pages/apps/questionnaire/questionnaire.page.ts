import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PageService} from "../../../services/page.service";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {BasePageDynamic} from "../../../base/BasePageDynamic";
import {EnumNegativeEmotions, EnumPositiveEmotions} from "../../../../enums/Enums";


@Component({
     selector   : 'app-page',
     templateUrl: './questionnaire.page.html',
     styleUrls  : ['./questionnaire.page.scss'],
})
export class QuestionnairePage extends BasePageDynamic implements AfterViewInit
{
     @ViewChild('cardHeader', {read: ElementRef, static: false}) cardHeader:ElementRef;
     @ViewChild('cardContent', {static: false}) cardContent;





     constructor(route:ActivatedRoute,
                 navController:ArrowNavigationService,
                 pageService:PageService,
                 backendService:BackendService,
                 loaderService:ArrowLoaderService,
                 alertService:ArrowAlertService)
     {
          super(route, navController, pageService, backendService, loaderService, alertService);
     }





     ngAfterViewInit():void
     {
          if (this.page.questionnaire.hide_title)
          {
               return;
          }


          setTimeout(() => {
               this.cardContent.el.style.maxHeight = `calc(100vh - ${122 + this.cardHeader.nativeElement.offsetHeight}px)`;
          }, 250);
     }





     onNext(submit?:boolean)
     {
          if (this.page.questionnaire.override_next_btn)
          {
               // Emotions App - (Page NegativeEmotions)
               if (this.page.auid == "c40bdd1e-3e12-b7a0-2fd4-ad6153423365")
               {
                    this.calculateEmotion();
               }
          }


          super.onNext(submit);
     }





     private calculateEmotion():void
     {
          let positive:number = 0;
          let negative:number = 0;
          let emotion:string;


          for (let itemQuestion of this.pageService.previousPage.questionnaire.questions)
          {
               positive += itemQuestion.answer;
          }
          for (let itemQuestion of this.page.questionnaire.questions)
          {
               negative += itemQuestion.answer;
          }


          let result:number = positive - negative;
          if (result.toString().length > 1)
          {
               let resultWithoutSign:number = Math.abs(result);

               while (true)
               {
                    let resultChars:string = resultWithoutSign.toString();

                    if (resultWithoutSign == 10 || resultChars.length == 1)
                    {
                         break;
                    }
                    else if (resultChars.length == 2)
                    {
                         let firstValue:number = Number.parseInt(resultChars[0].toString());
                         let secondValue:number = Number.parseInt(resultChars[1].toString());

                         resultWithoutSign = firstValue + secondValue;
                    }
                    else
                    {
                         return;
                    }
               }

               if (result < 0)
               {
                    resultWithoutSign = -(resultWithoutSign);
               }

               result = resultWithoutSign;
          }


          if (result == 0)
          {
               emotion = "Pride";
          }
          else
          {
               let emotions:any[] = result > 0
                       ? EnumPositiveEmotions
                       : EnumNegativeEmotions;


               for (let itemEmotion of emotions)
               {
                    if (result == itemEmotion.value)
                    {
                         emotion = itemEmotion.name;
                         break;
                    }
               }
          }


          this.backendService.updateEmotion(emotion, this.pageService.nextPage.questionnaire.title);
     }
}
