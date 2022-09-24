import {Component, OnInit} from '@angular/core';
import {ArrowBackendService} from "../../services/backends/base/arrow-backend.service";
import {ArrowLoaderService} from "../../services/loader/arrow-loader.service";
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {ArrowMenuService} from "../../services/menu/arrow-menu.service";
import {EnumField, EnumRole} from "../../../enums/Enums";
import {ArrowToastService} from "../../services/toast/arrow-toast.service";
import {BackendService} from "../../../services/backend.service";
import {ArrowAlertService} from "../../services/alert/arrow-alert.service";
import {createElementCssSelector} from "@angular/compiler";


@Component({
     selector   : 'app-login',
     templateUrl: './arrow-login.page.html',
     styleUrls  : ['./arrow-login.page.scss'],
})
export class ArrowLoginPage implements OnInit
{
     public showLogin:boolean = true;
     public disableLogin:boolean;
     public showSignUp:boolean;
     public showRememberMe:boolean;
     public title:string = "Admin";

     public name:string;
     public username:string;
     public password:string;
     public rememberMe:boolean;
     public pageAfterLogin:string;

     public regex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");

     public loginKey:string = EnumField.LOGIN_INFO;
     public logo:string;
     public logoWhite:string;




     constructor(public backendService:ArrowBackendService,
                 public loaderService:ArrowLoaderService,
                 public navController:NavController,
                 public storage:Storage,
                 public menuService:ArrowMenuService,
                 public toastService:ArrowToastService,
                 public backendServiceMy:BackendService,
                 public alertService:ArrowAlertService)
     {
     }





     ngOnInit():void
     {
          this.logo = "assets/images/report.png";
          this.logoWhite = "assets/images/report-white.png";


          this.menuService.hide(EnumField.LEFT_MENU)
                  .then(() => this.storage.get(this.loginKey))
                  .then((value) => {

                       if (value)
                       {
                            this.onLogin(value)
                       }
                  });
     }





     public reset()
     {
          this.showLogin = !this.showLogin;


          this.name = null;
          this.username = null;
          this.password = null;
          this.rememberMe = false;
     }





     public createAccount():Promise<any>
     {
          let name:string = this.name && this.name.trim();
          let email:string = this.username && this.username.trim();
          let password:string = this.password && this.password.trim();


          if (!name || !email || !password)
          {
               let msg:string = !name
                       ? "Name is required."
                       : !email
                               ? "Email is required."
                               : "Password is required.";


               this.toastService.showError(msg);
               return;
          }
          else if (name.length < 3)
          {
               this.toastService.showError("Name must be at least 3 characters.");
               return;
          }
          else if (!this.regex.test(email))
          {
               this.toastService.showError("Email is invalid.");
               return;
          }
          else if (password.length < 6)
          {
               this.toastService.showError("Password must be at least 6 characters.");
               return;
          }


          let params:any = {
               username    : email,
               password    : password,
               force_create: true
          };


          return this.loaderService.show("Creating Account...")
                  .then(() => this.backendService.login(params))
                  .then((response) => {

                       if (response.data.error)
                       {
                            throw {msg: "This user is already registered. Please login."};
                       }


                       let data = response["data"];
                       let entityId = data["customResult"]["data"]["response"]["data"]["entityId"];


                       return Promise.resolve({
                            userId    : data.id,
                            entityId  : entityId,
                            username  : email,
                            password  : password,
                            name      : name,
                            role      : EnumRole.USER,
                            active    : true,
                            user_roles: {}
                       });
                  })

                  .then((user) => this.backendServiceMy.saveUser(user))

                  .finally(() => this.loaderService.hide());
     }





     public onLogin(params?:any):Promise<any>
     {
          if (!params)
          {
               params = {
                    username: this.username,
                    password: this.password,
               };
          }


          return this.loaderService.show("Authenticating")
                  .then(() => this.backendService.login(params))
                  .catch(() => Promise.reject({msg: "Invalid Username or Password."}))

                  .then((response) => response[EnumField.DATA][EnumField.ID])
                  .then((userId) => this.backendServiceMy.getUserDetail(userId, params.password))

                  .finally(() => this.loaderService.hide());
     }





     public saveLoginInfo(params:any):void
     {
          this.storage.set(this.loginKey, params);
     }





     public forgotPassword():void
     {
          this.alertService.showInput("Email", "Type Your Email")
                  .then(async (value:string) => {

                       if (!value)
                       {
                            return;
                       }

                       await this.loaderService.show();


                       let {success, msg} = await this.backendService.forgotPassword(value);
                       success
                               ? this.toastService.showSuccess(msg)
                               : this.toastService.showError(msg);


                       await this.loaderService.hide();
                  });
     }
}
