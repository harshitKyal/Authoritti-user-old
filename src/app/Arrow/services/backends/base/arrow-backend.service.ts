import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {iBackend} from "./interfaces/i-backend";
import {ArrowVOEnvironment} from "../../../vo/ArrowVOEnvironment";
import {Storage} from "@ionic/storage";
import {ArrowBackendEnvironmentService} from "./arrow-backend-environment.service";
import {VOUser} from "../../../../vo/VOUser";


@Injectable({
     providedIn: 'root'
})
export class ArrowBackendService implements iBackend
{
     public brainCloud: BrainCloudWrapper;

     protected initSource: BehaviorSubject<boolean> = new BehaviorSubject(false);

     public signedInUser: VOUser;

     public reconnect$ = new Subject();





     constructor(private env: ArrowBackendEnvironmentService,
                 public storage: Storage)
     {
     }





     get environments(): ArrowVOEnvironment[]
     {
          return this.env.environments;
     }





     get hasEnvironments(): boolean
     {
          return this.env.hasEnvironments;
     }





     get defaultEnvironment(): ArrowVOEnvironment
     {
          return this.env.defaultEnvironment;
     }





     connect(env: ArrowVOEnvironment): void
     {
     }





     get isInitialized(): boolean
     {
          return this.initSource.value;
     }





     initialize(env: ArrowVOEnvironment): Observable<any>
     {
          return undefined;
     }





     checkUserSession(): Promise<any>
     {
          return Promise.resolve(undefined);
     }





     login(params?: any): Promise<any>
     {
          return undefined;
     }





     logout(): Promise<any>
     {
          this.signedInUser = null;
          return this.storage.clear();
     }





     forgotPassword(email: string): Promise<any>
     {
          return undefined;
     }





     callCloudScript(script: string, payload: any): Promise<any>
     {
          return undefined;
     }
}
