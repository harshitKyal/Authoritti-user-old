import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BackendService} from "../../../../services/backend.service";
import {EnumField} from "../../../../enums/Enums";
import {VOCategory} from "../../../../vo/VOCategory";


@Injectable({
	providedIn: 'root'
})
export class ResolveCategoryAddEditGuard implements Resolve<VOCategory>
{
	constructor(private backendService:BackendService)
	{
	}





	resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOCategory> | Promise<VOCategory> | VOCategory
	{
		console.log('ResolveCategoryAddEditGuard');


		let id:string = route.paramMap.get(EnumField.CATEGORY_ID);


		return id
			   ? this.backendService.getCategory(id)
			   : new VOCategory();
	}
}
