import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BackendService} from "../../../../services/backend.service";
import {EnumField} from "../../../../enums/Enums";
import {VOGroup} from "../../../../vo/VOGroup";


@Injectable({
	providedIn: 'root'
})
export class ResolveGroupAddEditGuard implements Resolve<VOGroup>
{
	constructor(private backendService:BackendService)
	{
	}





	resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOGroup> | Promise<VOGroup> | VOGroup
	{
		console.log('ResolveGroupAddEditGuard');


		let id:string = route.paramMap.get(EnumField.GROUP_ID);


		return id
			  ? this.backendService.getGroup(id)
			  : new VOGroup();
	}
}
