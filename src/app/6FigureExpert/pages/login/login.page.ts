import {Component} from '@angular/core';
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {ArrowLoginPage} from "../../../Arrow/pages/arrow-login/arrow-login.page";
import {ArrowBackendService} from "../../../Arrow/services/backends/base/arrow-backend.service";
import {ArrowLoaderService} from "../../../Arrow/services/loader/arrow-loader.service";
import {ArrowMenuService} from "../../../Arrow/services/menu/arrow-menu.service";
import {EnumRoute} from "../../../enums/Enums";
import {BackendService} from "../../../services/backend.service";
import {ArrowToastService} from "../../../Arrow/services/toast/arrow-toast.service";
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
          this.pageAfterLogin = EnumRoute.HOME;
          this.title = "Login";
          this.showSignUp = true;
          this.showRememberMe = true;


          super.ngOnInit();
     }





     createAccount():Promise<any>
     {
          return super.createAccount()
                  .then(() => {

                       this.toastService.showSuccess("Account created successfully.");
                       this.showLogin = true;
                  })

                  .catch((error) => this.toastService.showError(error.msg));
     }





     onLogin(params?:any):Promise<any>
     {
          this.disableLogin = true;


          return super.onLogin(params)
                  .then((response) => {

                       this.backendServiceMy.signedInUser = response;
                       this.backendServiceMy.signedInUser.thumbnail = "assets/defaults/profile.png";

                       this.backendServiceMy.internal.signedInUser = response;
                  })

                  .then(() => this.backendServiceMy.getApps())
                  .then((apps) => this.backendServiceMy.apps = apps)

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
