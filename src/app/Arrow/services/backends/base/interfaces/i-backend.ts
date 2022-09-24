import {Observable} from "rxjs";
import {ArrowVOEnvironment} from "../../../../vo/ArrowVOEnvironment";


export abstract class iBackend
{
	abstract get environments():ArrowVOEnvironment[];
	abstract get hasEnvironments():boolean;
	abstract get defaultEnvironment():ArrowVOEnvironment;

	abstract connect(env:ArrowVOEnvironment):void;
	abstract get isInitialized():boolean;
	abstract initialize(env:ArrowVOEnvironment):Observable<any>;
	abstract checkUserSession():Promise<any>;

	abstract login(params?:any):Promise<any>;
	abstract logout():Promise<any>;
	abstract forgotPassword(email:string):Promise<any>;

	abstract callCloudScript(script:string, payload:any):Promise<any>;
}
