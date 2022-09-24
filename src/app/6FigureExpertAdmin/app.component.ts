import {Component} from '@angular/core';
import {Base} from "../base/Base";
import {BackendService} from "../services/backend.service";
import {EnumRoute} from "../enums/Enums";
import {NavController} from '@ionic/angular';


// import {ConnectionService} from "ng-connection-service";


@Component({
     selector   : 'figure-expert-admin',
     templateUrl: 'app.component.html',
     styleUrls  : ['app.component.scss']
})
export class AppComponent extends Base
{
     public showNoInternet: boolean;





     constructor(public backendService: BackendService,
                 private navController: NavController)
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
          // 			   // console.clear();
          // 			   this.showNoInternet = true;
          // 		   }
          // 	   });
     }





     public onLogout(): void
     {
          this.backendService.internal.logout()
                  .then(() => this.navController.navigateRoot(EnumRoute.LOGIN))
                  .then(() => {

                       this.backendService.signedInUser = null;
                  });
     }





     public changeTheme(checked: boolean): void
     {
          this.backendService.blackTheme = checked;
          document.body.classList.toggle('dark', checked);
          document.body.classList.toggle('white', !checked);
     }
}
