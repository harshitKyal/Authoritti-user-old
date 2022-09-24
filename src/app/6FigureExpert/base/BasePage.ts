import {Base} from '../../base/Base';
import {PageService} from '../services/page.service';
import {ArrowNavigationService} from '../../Arrow/services/navigation/arrow-navigation.service';
import {EnumApp, EnumField, EnumPage, EnumRoute} from '../../enums/Enums';
import {ActivatedRoute} from '@angular/router';
import {VOPage} from '../../vo/VOPage';
import {OnDestroy, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {ArrowLoaderService} from '../../Arrow/services/loader/arrow-loader.service';
import {ArrowAlertService} from '../../Arrow/services/alert/arrow-alert.service';


export const enum EnumDirection
{
     Forward,
     Back
}


export class BasePage extends Base implements OnInit, OnDestroy
{
     public appName:string;
     public page:VOPage;
     public progressValue:number = 0;





     constructor(public route:ActivatedRoute,
                 public navController:ArrowNavigationService,
                 public pageService:PageService,
                 public backendService:BackendService,
                 public loaderService:ArrowLoaderService,
                 public alertService:ArrowAlertService)
     {
          super();
     }





     ngOnInit():void
     {
          this.appName = this.backendService.currentApp.title;
          this.page = this.route.snapshot.data[EnumField.PAGE_INFO];


          if (this.page)
          {
               this.page.isShown = true;
               this.progressValue = parseFloat(((this.pageService.currentPageIndex) / this.backendService.pagesCount).toFixed(2));
          }
     }





     ngOnDestroy():void
     {
          if (this.page)
          {
               this.page.isShown = false;
          }
     }





     public returnHome()
     {
          if (this.backendService.currentApp.type == EnumApp.CUSTOM)
          {
               this.navController.back(this.backendService.currentApp.url);
          }
          else
          {
               this.navController.back(['', this.backendService.currentApp.url]);
          }
     }





     public reset()
     {
          this.pageService.currentPage.reset();
     }





     public startSession():void
     {
          this.pageService.reset();
          this.onNext();
     }





     public onNext(submit?:boolean):void
     {
          let curPage:VOPage = this.pageService.currentPage;
          let nextPage:VOPage = this.pageService.nextPage;


          this.pageService.increasePage();


          if (submit)
          {
               this.changePage(EnumDirection.Forward, curPage, nextPage, true);
          }
          else
          {
               this.changePage(EnumDirection.Forward, curPage, nextPage);
          }
     }





     public onPrevious():void
     {
          let curPage:VOPage = this.pageService.currentPage;
          let previousPage:VOPage = this.pageService.previousPage;


          this.pageService.decreasePage();


          this.changePage(EnumDirection.Back, curPage, previousPage);
     }





     private changePage(direction:EnumDirection, curPage:VOPage, page:VOPage, report?:boolean):void
     {
          // Start and Report pages needs count=1
          // 'curPage' can be null on Start and Report (if not defined)
          // 'page' can be null when reach end


          let count:number = 2;
          if (!curPage || curPage.type == EnumPage.REPORT)
          {
               count = 1;
          }


          let type:string = page && page.type;
          if (report)
          {
               type = EnumPage.REPORT;
          }


          switch (type)
          {
               case EnumPage.INTRO:
               {
                    direction == EnumDirection.Back ?
                            this.navController.backWithUrl(EnumRoute.INTRO, {id: page.auid, skipUrlCount: count}) :
                            this.navController.forwardWithUrl(EnumRoute.INTRO, {id: page.auid, skipUrlCount: count, animated: false});
                    break;
               }


               case EnumPage.QUESTIONNAIRE:
               {
                    direction == EnumDirection.Back ?
                            this.navController.backWithUrl(EnumRoute.QUESTIONNAIRE, {id: page.auid, skipUrlCount: count}) :
                            this.navController.forwardWithUrl(EnumRoute.QUESTIONNAIRE, {id: page.auid, skipUrlCount: count, animated: false});
                    break;
               }


               case EnumPage.QUESTIONNAIRE_DYNAMIC:
               {
                    direction == EnumDirection.Back ?
                            this.navController.backWithUrl(EnumRoute.QUESTIONNAIRE_DYNAMIC, {id: page.auid, skipUrlCount: count}) :
                            this.navController.forwardWithUrl(EnumRoute.QUESTIONNAIRE_DYNAMIC, {id: page.auid, skipUrlCount: count, animated: false});
                    break;
               }


               case EnumPage.TEMPLATE:
               {
                    direction == EnumDirection.Back ?
                            this.navController.backWithUrl(`${EnumRoute.TEMPLATE}/${page.auid}`, {skipUrlCount: count}) :
                            this.navController.forwardWithUrl(`${EnumRoute.TEMPLATE}/${page.auid}`, {skipUrlCount: count, animated: false});
                    break;
               }


               case EnumPage.SECTION:
               {
                    direction == EnumDirection.Back ?
                            this.navController.backWithUrl(`${EnumRoute.SECTION}/${page.auid}`, {skipUrlCount: count}) :
                            this.navController.forwardWithUrl(`${EnumRoute.SECTION}/${page.auid}`, {skipUrlCount: count, animated: false});
                    break;
               }


               case EnumPage.REPORT:
               {
                    this.navController.forwardWithUrl(EnumRoute.REPORT, {skipUrlCount: count});
                    break;
               }
          }
     }
}
