import {Component} from '@angular/core';
import {ArrowLoginPage} from "../../../Arrow/pages/arrow-login/arrow-login.page";
import {ArrowBackendService} from "../../../Arrow/services/backends/base/arrow-backend.service";
import {ArrowLoaderService} from "../../../Arrow/services/loader/arrow-loader.service";
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {EnumField, EnumRole, EnumRoute} from "../../../enums/Enums";
import {ArrowMenuService} from "../../../Arrow/services/menu/arrow-menu.service";
import {BackendService} from "../../../services/backend.service";
import {ArrowToastService} from "../../../Arrow/services/toast/arrow-toast.service";
import {DataManager} from "../../../managers/DataManager";
import {ArrowAlertService} from "../../../Arrow/services/alert/arrow-alert.service";


@Component({
     selector   : 'app-login',
     templateUrl: '../../../Arrow/pages/arrow-login/arrow-login.page.html',
     styleUrls  : ['../../../Arrow/pages/arrow-login/arrow-login.page.scss'],
})
export class LoginPage extends ArrowLoginPage
{
     constructor(backendService:ArrowBackendService,
                 loaderService:ArrowLoaderService,
                 navController:NavController,
                 storage:Storage,
                 menuService:ArrowMenuService,
                 toastService:ArrowToastService,
                 backendServiceMy:BackendService,
                 alertService:ArrowAlertService)
     {
          super(backendService, loaderService, navController, storage, menuService, toastService, backendServiceMy, alertService);
     }





     ngOnInit():void
     {
          this.loginKey = EnumField.LOGIN_INFO_ADMIN;
          this.pageAfterLogin = EnumRoute.HOME;
          this.showRememberMe = true;


          super.ngOnInit();
     }





     onLogin(params?:any):Promise<any>
     {
          this.disableLogin = true;


          return super.onLogin(params)
                  .then((response) => {

                       if (response.role != EnumRole.ADMIN && !DataManager.instance.checkUserRules(response.user_roles))
                       {
                            throw {msg: 'Only Admin is allowed.'};
                       }


                       this.backendServiceMy.appPages = this.backendServiceMy.appPagesSource;
                       if (response.role == EnumRole.USER)
                       {
                            this.backendServiceMy.appPages = this.backendServiceMy.appPagesSource
                                    .filter((item) => item.url != EnumRoute.USERS);
                       }


                       this.backendServiceMy.signedInUser = response;
                       this.backendServiceMy.internal.signedInUser = response;
                  })

                  .then(() => this.backendServiceMy.getApps(true))
                  .then((apps) => {

                       this.backendServiceMy.apps = apps;

                       // ADMIN only
                       if (this.backendServiceMy.signedInUser.role == EnumRole.ADMIN)
                       {
                            this.backendServiceMy.signedInUser.user_roles = apps.reduce((acc, item) => {
                                 acc[item.entityId] = {
                                      can_add    : true,
                                      can_edit   : true,
                                      can_delete : true,
                                      can_reorder: true
                                 };
                                 return acc;
                            }, {});
                       }
                  })


                  .then(() => this.navController.navigateRoot(this.pageAfterLogin))
                  .then(() => {

                       if (this.rememberMe)
                       {
                            let info:any = {
                                 username: this.backendServiceMy.signedInUser.username,
                                 password: this.backendServiceMy.signedInUser.password,
                            };


                            this.saveLoginInfo(info);
                       }
                  })

                  .catch((error) => {

                       this.disableLogin = false;
                       this.toastService.showError(error.msg);
                  });
     }
}
