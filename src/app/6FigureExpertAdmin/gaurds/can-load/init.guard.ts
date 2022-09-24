import {Injectable} from '@angular/core';
import {CanLoad, Route, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {BackendService} from "../../../services/backend.service";


@Injectable({
	providedIn: 'root'
})
export class InitGuard implements CanLoad
{
	constructor(private backendService:BackendService)
	{
	}





	canLoad(route:Route, segments:UrlSegment[]):Observable<boolean> | Promise<boolean> | boolean
	{
		console.log("InitGuard");


		if (this.backendService.internal.isInitialized)
		{
			return true;
		}


		return this.backendService.internal.initialize(this.backendService.internal.defaultEnvironment);
	}
}
