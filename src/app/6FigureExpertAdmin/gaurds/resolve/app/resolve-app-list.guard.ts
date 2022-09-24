import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BackendService} from "../../../../services/backend.service";
import {NavController} from "@ionic/angular";
import {VOApp} from "../../../../vo/VOApp";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {VOError} from "../../../../vo/VOError";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";


@Injectable({
     providedIn: 'root'
})
export class ResolveAppListGuard implements Resolve<VOApp[]>
{
     constructor(private navController:NavController,
                 private backendService:BackendService,
                 private alertService:ArrowAlertService,
                 private navControllerArrow:ArrowNavigationService)
     {
     }





     resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOApp[]> | Promise<VOApp[]> | VOApp[]
     {
          console.log('ResolveAppListGuard');


          return this.backendService.getApps()
                  .then((apps) => {

                       this.backendService.apps = apps;
                       return apps;
                  })

                  .catch((error:VOError) => {

                       this.alertService.error(error.msg);
                       this.navController.navigateRoot(this.navControllerArrow.root);


                       return null;
                  });
     }
}
