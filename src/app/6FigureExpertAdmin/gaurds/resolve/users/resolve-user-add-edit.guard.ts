import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BackendService} from "../../../../services/backend.service";
import {EnumField} from "../../../../enums/Enums";
import {VOUser} from "../../../../vo/VOUser";


@Injectable({
	providedIn: 'root'
})
export class ResolveUserAddEditGuard implements Resolve<VOUser>
{
	constructor(private backendService:BackendService)
	{
	}





	resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOUser> | Promise<VOUser> | VOUser
	{
		console.log('ResolveUserAddEditGuard');


		let id:string = route.paramMap.get(EnumField.USER_ID);


		return this.backendService.getUser(id);
	}
}
