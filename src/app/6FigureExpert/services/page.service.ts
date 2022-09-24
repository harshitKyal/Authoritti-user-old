import {Injectable} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {VOPage} from "../../vo/VOPage";
import {EnumApp, EnumPage} from "../../enums/Enums";


@Injectable({
     providedIn: 'root'
})
export class PageService
{
     public currentPageIndex:number = -1;
     public pageIndexHash:any = {};



     constructor(private backendService:BackendService)
     {
     }





     public reset():void
     {
          this.currentPageIndex = -1;
          this.pageIndexHash = {};
     }





     public increasePage(by:number = 1):void
     {
          this.currentPageIndex += by;
     }





     public decreasePage(by:number = 1):void
     {
          this.currentPageIndex -= by;
     }





     public get currentPage():VOPage
     {
          return this.backendService.getPages()[this.currentPageIndex];
     }





     public get nextPage():VOPage
     {
          let index:number = this.currentPageIndex + 1;


          if (index < this.backendService.getPages().length)
          {
               return this.backendService.getPages()[index];
          }


          return null;
     }





     public get previousPage():VOPage
     {
          let index:number = this.currentPageIndex - 1;


          if (index >= 0)
          {
               return this.backendService.getPages()[index];
          }


          return null;
     }





     public get isFirstPage():boolean
     {
          return this.currentPageIndex == 0;
     }





     public get answers():any
     {
          return this.backendService.currentSession.answers;
     }





     public saveSession():Promise<any>
     {
          let pages:VOPage[] = this.backendService.getPages();
          let answers:any = {};


          if (this.backendService.currentApp.type == EnumApp.DYNAMIC)
          {
               answers = this.getAnswers(pages);
          }
          else
          {
               switch (this.backendService.currentApp.entityId)
               {
                    case EnumApp.FINANCIAL_GOALS:
                    {
                         answers = this.backendService.financialGoal.finalAnswer;
                         break;
                    }


                    case EnumApp.SKILLS:
                    {
                         answers = this.getSkillsAppAnswers(pages);
                         break;
                    }


                    case EnumApp.EMOTIONS:
                    {
                         answers = this.getAnswers(pages);
                         break;
                    }
               }
          }


          return this.backendService.saveSession(answers);
     }





     private getAnswers(pages:VOPage[]):any
     {
          let finalAnswer = {};


          for (let itemPage of pages)
          {
               if (itemPage.type == EnumPage.TEMPLATE)
               {
                    finalAnswer[itemPage.auid] = itemPage.template.data;
               }

               else if (itemPage.type == EnumPage.QUESTIONNAIRE ||
                        itemPage.type == EnumPage.QUESTIONNAIRE_DYNAMIC)
               {
                    for (let itemQuestion of itemPage.questionnaire.questions)
                    {
                         finalAnswer[itemQuestion.answerId] = itemQuestion.answer;
                    }
               }
          }


          return finalAnswer;
     }





     private getSkillsAppAnswers(pages:VOPage[]):any
     {
          let finalAnswer = {};


          for (let itemPage of pages)
          {
               if (itemPage.type == EnumPage.TEMPLATE)
               {
                    finalAnswer[itemPage.auid] = itemPage.template.data;
               }


               else if (itemPage.auid.includes("professional_skill") || itemPage.auid.includes("professional_trait")
                        || itemPage.auid.includes("personal_skill") || itemPage.auid.includes("personal_trait"))
               {
                    let answer = {};
                    for (let itemQuestion of itemPage.questionnaire.questions)
                    {
                         answer[itemQuestion.answerId] = itemQuestion.answer;
                    }
                    finalAnswer[itemPage.auid] = answer;
               }


               else if (itemPage.type == EnumPage.QUESTIONNAIRE
                        || itemPage.type == EnumPage.QUESTIONNAIRE_DYNAMIC)
               {
                    for (let itemQuestion of itemPage.questionnaire.questions)
                    {
                         finalAnswer[itemQuestion.answerId] = itemQuestion.answer;
                    }
               }
          }


          return finalAnswer;
     }

}
