import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {NavController} from "@ionic/angular";
import {VOApp} from "../../../vo/VOApp";
import {BackendService} from "../../../services/backend.service";
import {ArrowAlertService} from "../../../Arrow/services/alert/arrow-alert.service";
import {ArrowNavigationService} from "../../../Arrow/services/navigation/arrow-navigation.service";
import {EnumApp, EnumField} from "../../../enums/Enums";
import {ArrowLoaderService} from "../../../Arrow/services/loader/arrow-loader.service";
import {VOPage} from "../../../vo/VOPage";


@Injectable({
     providedIn: 'root'
})
export class ResolveAppInfoGuard implements Resolve<any>
{
     constructor(private navController:NavController,
                 private backendService:BackendService,
                 private alertService:ArrowAlertService,
                 private navControllerArrow:ArrowNavigationService,
                 private loaderService:ArrowLoaderService)
     {
     }





     resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<any> | Promise<any> | any
     {
          console.log('ResolveAppInfoGuard');


          // clear existing
          this.backendService.curIntroPage = null;


          let app:VOApp = this.backendService.currentApp;
          let appInfo = {};


          if (app.type == EnumApp.CUSTOM)
          {
               return this.loaderService.show()
                       .then(() => this.backendService.getAppPagesFinancialGoal())
                       .then((value) => appInfo[EnumField.PAGES] = value)


                       .then(() => this.backendService.getSessions(app.entityId))
                       .then((value) => appInfo[EnumField.SESSIONS] = value)
                       .then(() => appInfo)


                       .catch((error) => {

                            this.alertService.error(error);
                            this.navController.navigateRoot(this.navControllerArrow.root);

                            return null;
                       })


                       .finally(() => this.loaderService.hide());
          }
          else
          {
               let pages:VOPage[];


               return this.loaderService.show()
                       .then(() => this.backendService.getAppPages(app.entityId))
                       .then((value) => pages = value)


                       .then(() => this.backendService.getAppCategories(app.entityId))
                       .then((value) => this.backendService.categories = value)


                       .then(() => this.backendService.getAppGroups(app.entityId))
                       .then((value) => this.backendService.groups = value)


                       .then(() => this.backendService.getSessions(app.entityId))
                       .then((value) => appInfo[EnumField.SESSIONS] = value)
                       .then(() => {

                            if (app.entityId == EnumApp.SKILLS)
                            {
                                 appInfo[EnumField.PAGES] = this.backendService.getAppPagesSkills(pages);
                            }
                            else if (app.entityId == EnumApp.EMOTIONS)
                            {
                                 appInfo[EnumField.PAGES] = this.backendService.getAppPagesEmotions(pages);
                            }
                            else
                            {
                                 appInfo[EnumField.PAGES] = pages;
                            }


                            return appInfo;
                       })


                       // .catch((error) => {
                       //
                       //      this.alertService.error(error);
                       //      this.navController.navigateRoot(this.navControllerArrow.root);
                       //
                       //      return null;
                       // })
                       //

                       .finally(() => {

                            console.log("resolve finally");
                            this.loaderService.hide()
                       });
          }
     }
}
