import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {VOPage} from "../../../vo/VOPage";
import {PageService} from "../../services/page.service";
import {EnumApp, EnumField, EnumPage} from "../../../enums/Enums";
import {BackendService} from "../../../services/backend.service";
import {VOApp} from "../../../vo/VOApp";
import {VOFinancialGoal} from "../../pages/apps/custom/financial-goals/vo/VOFinancialGoal";
import {VOProduct} from "../../pages/apps/custom/financial-goals/vo/VOProduct";


@Injectable({
     providedIn: 'root'
})
export class ResolvePageGuard implements Resolve<VOPage>
{
     constructor(private pageService:PageService,
                 private backendService:BackendService)
     {
     }





     resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOPage> | Promise<VOPage> | VOPage
     {
          console.log('ResolvePageGuard');


          // TODO fix
          // let pageId:string = route.paramMap.get(EnumField.ID);
          // only to sync currentPageIndex when browser back/forth are used
          // if (pageId)
          // {
          // 	if (this.pageService.indexHash[pageId])
          // 	{
          // 		this.pageService.currentPageIndex = this.pageService.indexHash[pageId];
          // 	}
          // 	else
          // 	{
          // 		this.pageService.indexHash[pageId] = this.pageService.currentPageIndex;
          // 	}
          // }


          let curApp:VOApp = this.backendService.currentApp;
          let curPage:VOPage = this.pageService.currentPage;


          // don't reassign to (already saved) answers when return back
          if (curPage.isShown)
          {
               return curPage;
          }


          if (curPage.type == EnumPage.QUESTIONNAIRE
              || curPage.type == EnumPage.TEMPLATE)
          {
               if (curApp.type == EnumApp.DYNAMIC)
               {
                    this.fillAnswers(curPage);
               }
               else
               {
                    switch (curApp.entityId)
                    {
                         case EnumApp.FINANCIAL_GOALS:
                         {
                              this.fillAnswersFinancialGoals(curPage);
                              break;
                         }


                         case EnumApp.SKILLS:
                         {
                              this.fillAnswersSkills(curPage);
                              break;
                         }


                         case EnumApp.EMOTIONS:
                         {
                              this.fillAnswersEmotions(curPage);
                              break;
                         }
                    }
               }
          }


          return curPage;
     }





     public fillAnswers(page:VOPage):void
     {
          for (let itemQuestion of page.questionnaire.questions)
          {
               itemQuestion.answer = this.pageService.answers[itemQuestion.answerId];
          }
     }





     public fillAnswersEmotions(page:VOPage):void
     {
          if (page.type == EnumPage.TEMPLATE)
          {
               page.template.data = this.pageService.answers[page.auid];
          }
          else
          {
               this.fillAnswers(page);
          }
     }





     public fillAnswersSkills(page:VOPage):void
     {
          if (page.type == EnumPage.TEMPLATE)
          {
               page.template.data = this.pageService.answers[page.auid] || [];
          }
          else if (page.auid.includes("professional_skill") || page.auid.includes("professional_trait")
                   || page.auid.includes("personal_skill") || page.auid.includes("personal_trait"))
          {
               let answers = this.pageService.answers[page.auid];
               for (let itemQuestion of page.questionnaire.questions)
               {
                    itemQuestion.answer = answers && answers[itemQuestion.answerId];
               }
          }
          else
          {
               this.fillAnswers(page);
          }
     }





     public fillAnswersFinancialGoals(page:VOPage):void
     {
          if (!page.questionnaire)
          {
               // dont apply answers
               return;
          }


          let answer:VOFinancialGoal = this.pageService.answers;
          let financialGoal:VOFinancialGoal = this.backendService.financialGoal;


          switch (page.questionnaire.auid)
          {
               case EnumField.ANNUAL_GOAL:
               {
                    financialGoal.annual_goal = (answer.annual_goal || null);
                    break;
               }


               case EnumField.PRODUCTS:
               {
                    financialGoal.products = answer.products
                            ? Object.entries(answer.products)
                                    .reduce((acc, [key, value]) => {

                                         acc[key] = new VOProduct(value);
                                         return acc;
                                    }, {})
                            : {};
                    break;
               }


               case EnumField.SALE_CONVERSION:
               {
                    Object.keys(financialGoal.products)
                            .forEach((key) => {

                                 financialGoal.products[key].closeRate = answer.products && answer.products[key]
                                         ? answer.products[key].closeRate
                                         : null;
                            });
                    break;
               }


               case EnumField.TASKS:
               {
                    financialGoal.tasks = {...answer.tasks};
                    break;
               }
          }
     }
}
