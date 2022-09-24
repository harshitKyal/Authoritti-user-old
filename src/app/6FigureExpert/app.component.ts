import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Base} from "../base/Base";
import {EnumApp, EnumRoute} from "../enums/Enums";
import {BackendService} from "../services/backend.service";
import {VOApp} from "../vo/VOApp";
import {ArrowMenuService} from "../Arrow/services/menu/arrow-menu.service";


// import {ConnectionService} from "ng-connection-service";


@Component({
     selector   : 'figure-expert',
     templateUrl: 'app.component.html',
     styleUrls  : ['app.component.scss']
})
export class AppComponent extends Base
{
     public showNoInternet: boolean;


     public appPages = [
          {title: 'Home', url: EnumRoute.HOME, icon: 'home'},
     ];


     public customApps: VOApp[] = [
          new VOApp({
               entityId: EnumApp.FINANCIAL_GOALS,
               name    : "Financial Goals",
               type    : EnumApp.CUSTOM,
               title   : 'Lead Calculator',
               url     : EnumRoute.FINANCIAL_GOALS,
               icon    : 'logo-usd',
               active  : true
          }),
     ];





     constructor(public backendService: BackendService,
                 private navController: NavController,
                 public menuService: ArrowMenuService)
     // private connectionService:ConnectionService)
     {
          super();


          // let hasNetworkConnection:boolean;
          // let hasInternetAccess:boolean;
          //
          //
          // this.connectionService.monitor()
          // 	   .subscribe((currentState) => {
          //
          // 		   hasNetworkConnection = currentState.hasNetworkConnection;
          // 		   hasInternetAccess = currentState.hasInternetAccess;
          //
          //
          // 		   if (hasNetworkConnection && hasInternetAccess)
          // 		   {
          // 			   this.showNoInternet = false;
          // 		   }
          // 		   else
          // 		   {
          // 			   console.clear();
          // 			   this.showNoInternet = true;
          // 		   }
          // 	   });


          this.backendService.internal.reconnect$
                  .subscribe(() => {

                       console.log('reconnect');

                       setTimeout(() => {

                            this.backendService.getApps()
                                    .then((res) => {
                                         console.log(res);
                                    })

                            // this.backendService.internal.login({
                            //      username: this.backendService.signedInUser.username,
                            //      password: this.backendService.signedInUser.password,
                            // })
                            //         .then(() => this.backendService.internal.checkUserSession())
                            //         .then(() => {
                            //              console.log('ok session');
                            //         })
                            //         .catch(() => {
                            //              console.log('catch session');
                            //         });
                       }, 5000)
                  });
     }





     public onHome()
     {
          this.backendService.currentApp = null;
          this.backendService.curIntroPage = null;
     }





     public onAppChange(app: VOApp): void
     {
          this.backendService.currentApp = app;
          this.navController.navigateRoot(['', app.url]);
     }





     public onAppChangeCustom(app: VOApp): void
     {
          this.backendService.currentApp = app;
          this.navController.navigateRoot([app.url]);
     }





     public onLogout(): void
     {
          this.menuService.close()
                  .then(() => this.backendService.internal.logout())
                  .then(() => this.navController.navigateRoot(EnumRoute.LOGIN))
                  .then(() => {

                       this.backendService.signedInUser = null;
                       this.backendService.currentApp = null;
                       this.backendService.curIntroPage = null;
                  });
     }





     public changeTheme(checked: boolean): void
     {
          this.backendService.blackTheme = checked;
          document.body.classList.toggle('dark', checked);
          document.body.classList.toggle('white', !checked);
     }
}
