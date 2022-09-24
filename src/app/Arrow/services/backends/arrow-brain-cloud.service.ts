import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ArrowBackendService} from "./base/arrow-backend.service";
import {ArrowVOEnvironment} from "../../vo/ArrowVOEnvironment";
import {Storage} from "@ionic/storage";
import {ArrowBackendEnvironmentService} from "./base/arrow-backend-environment.service";
import {VOError} from "../../../vo/VOError";


@Injectable({
     providedIn: 'root'
})
export class ArrowBrainCloudService extends ArrowBackendService
{
     public currentRequest;

     private twice: number = 0;





     constructor(env: ArrowBackendEnvironmentService,
                 storage: Storage)
     {
          super(env, storage);
     }





     public globalErrorHandler(err?: any): void
     {
          console.log("globalErrorHandler", err);


          this.connect(this.defaultEnvironment);
          // if (this.twice < 2)
          // {
          //      setTimeout(() => {
          //           this.callCloudScript(this.currentRequest[0], this.currentRequest[1]);
          //      }, 3000);
          // }
          // console.log("stop", this.twice);
          // this.twice += 1;
     }





     connect(env: ArrowVOEnvironment): void
     {
          this.brainCloud = new BrainCloudWrapper();
          this.brainCloud.initialize(env.key, env.secret, env.credential);


          this.brainCloud.brainCloudClient.setErrorCallback((err) => {
               this.globalErrorHandler(err);
          });
          console.log(this.brainCloud);
     }





     initialize(env: ArrowVOEnvironment): Observable<any>
     {
          return new Observable((subscriber) => {

               this.connect(env);


               if (this.brainCloud.brainCloudClient.isInitialized())
               {
                    this.initSource.next(true);

                    subscriber.next(true);
                    subscriber.complete();
               }
               else
               {
                    this.initSource.next(false);
                    subscriber.error("Not Initialized");
               }
          });
     }





     login(params: any): Promise<any>
     {
          return new Promise((resolve, reject) => {

               // let userId:string = params["username"];
               let email: string = params["username"];

               let password: string = params["password"];
               let forceCreate: boolean = params["force_create"];


               // this.brainCloud.authenticateUniversal(userId, password, forceCreate, (result) => {
               this.brainCloud.authenticateEmailPassword(email, password, forceCreate, (result) => {

                    console.log(result);


                    if (result["status"] == 200)
                    {
                         resolve(result);
                    }
                    else
                    {
                         reject(new VOError(result));
                    }
               });
          });
     }





     forgotPassword(email): Promise<any>
     {
          return new Promise((resolve) => {

               this.brainCloud.resetEmailPassword(email, (result) => {

                    console.log(result);


                    if (result["status"] == 200)
                    {
                         resolve({success: true, msg: "Password reset mail has been sent. Please check your email."});
                    }
                    else
                    {
                         resolve({success: false, msg: "Email address does not exists."});
                    }
               });
          });
     }





     checkUserSession()
     {
          return new Promise(
                  (resolve, reject) => {

                       this.brainCloud.time.readServerTime(result => {

                            console.log(result);


                            if (result.status == 200)
                            {
                                 resolve();
                                 return;
                            }
                            reject();
                       });
                  });
     }





     callCloudScript(script: string, payload: any): Promise<any>
     {
          // if (payload.table == 'pages')
          // {
          //      return this.checkUserSession()
          //              .then(() => {
          //                   console.log("then checkUserSession");
          //              })
          //              .catch(() => {
          //                   console.log("catch checkUserSession ");
          //              });
          //      console.log("return");
          //      return;
          // }

          this.currentRequest = [script, payload];
          return new Promise(
                  (resolve, reject) => {

                       this.brainCloud.script.runScript(script, payload, (result) => {

                            console.log(result);


                            if (result['status'] == 200)
                            {
                                 resolve(result);
                            }
                            else
                            {
                                 reject(new VOError(result));
                            }
                       });
                  })
                  .catch((err) => {

                       console.log('callCloudScript catch');

                       // noSession
                       if (err.code == "40304" || err.msg == "No session")
                       {
                            let {username, password} = this.signedInUser;
                            return this.login(
                                    {
                                         username: username,
                                         password: password
                                    })
                            .then(() => this.callCloudScript(script, payload));
                       }

                       console.log(err);
                       return Promise.reject(err);
                  })
                  .finally(() => {
                       console.log("finally");
                  });
     }
}
