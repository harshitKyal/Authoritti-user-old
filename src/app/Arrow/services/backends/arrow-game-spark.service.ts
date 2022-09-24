import {Injectable} from '@angular/core';
import {ArrowBackendService} from "./base/arrow-backend.service";
import {Observable, Subject} from "rxjs";
import {ArrowVOEnvironment} from "../../vo/ArrowVOEnvironment";
import {Storage} from "@ionic/storage";
import {ArrowBackendEnvironmentService} from "./base/arrow-backend-environment.service";


const Request = {
	AUTHENTICATION_REQUEST: "AuthenticationRequest",
	LOG_EVENT_REQUEST     : "LogEventRequest",
	GET_UPLOAD_URL_REQUEST: "GetUploadUrlRequest",
	GET_UPLOADED_REQUEST  : "GetUploadedRequest",
};


@Injectable({
	providedIn: 'root'
})
export class ArrowGameSparkService extends ArrowBackendService
{
	private gameSpark:GameSparks = new GameSparks();

	private messageSource:Subject<any> = new Subject();
	public message$ = this.messageSource.asObservable();





	constructor(env:ArrowBackendEnvironmentService,
			  storage:Storage)
	{
		super(env, storage);
	}





	initialize(env:ArrowVOEnvironment):Observable<any>
	{
		return new Observable((subscriber) => {

			let options:any = {};
			options.key = env.key;
			options.secret = env.secret;
			options.credential = env.credential;
			options.logger = console.log;


			options.onNonce = (nonce) => {
				return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(nonce, env.secret));
			};


			options.onInit = () => {
				this.initSource.next(true);

				subscriber.next();
				subscriber.complete();
			};


			options.onError = (error) => {
				this.initSource.next(false);

				subscriber.error(error);
			};


			options.onMessage = (msg) => {
				console.log("onMessage", msg);
				this.messageSource.next(msg);
			};


			env.isLive ?
				   this.gameSpark.initLive(options) :
				   this.gameSpark.initPreview(options);
		});
	}





	// login(params:any):Observable<any>
	// {
	// 	return new Observable((subscriber) => {
	//
	// 		let payload:any = {
	// 			userName: params["username"],
	// 			password: params["password"],
	// 		};
	//
	//
	// 		this.gameSpark.sendWithData(Request.AUTHENTICATION_REQUEST, payload, (response) => {
	//
	// 			if (this.hasError(response))
	// 			{
	// 				subscriber.error(response["error"]);
	// 			}
	// 			else
	// 			{
	// 				subscriber.next(response);
	// 				subscriber.complete();
	// 			}
	// 		});
	// 	});
	// }





	private hasError(response:any):boolean
	{
		let error:any = response["error"];


		if (error)
		{
			if (error["DETAILS"] == "UNRECOGNISED")
			{
				response["error"] = "Either username or password is wrong.";
			}

			return true;
		}


		return false;
	}
}
