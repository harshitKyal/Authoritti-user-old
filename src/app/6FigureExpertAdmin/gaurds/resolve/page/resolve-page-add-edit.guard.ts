import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {VOPage} from "../../../../vo/VOPage";
import {BackendService} from "../../../../services/backend.service";
import {EnumField} from "../../../../enums/Enums";


@Injectable({
	providedIn: 'root'
})
export class ResolvePageAddEditGuard implements Resolve<VOPage>
{
	constructor(private backendService:BackendService)
	{
	}





	resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOPage> | Promise<VOPage> | VOPage
	{
		console.log('ResolvePageAddEditGuard');


		let id:string = route.paramMap.get(EnumField.PAGE_ID);


		return new VOPage(this.backendService.getPage(id))
	}
}
