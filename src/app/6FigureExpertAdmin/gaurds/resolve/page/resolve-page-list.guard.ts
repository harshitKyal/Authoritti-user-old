import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {VOPage} from "../../../../vo/VOPage";
import {BackendService} from "../../../../services/backend.service";
import {EnumPage} from "../../../../enums/Enums";


@Injectable({
	providedIn: 'root'
})
export class ResolvePageListGuard implements Resolve<VOPage[]>
{
	constructor(private backendService:BackendService)
	{
	}





	resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOPage[]> | Promise<VOPage[]> | VOPage[]
	{
		console.log('ResolvePageListGuard');


		let appPages:any = {
			questionnaire: [],
			report       : []
		};


		let pages = this.backendService.getPages();
		for (let page of pages)
		{
			if (page.type == EnumPage.REPORT)
			{
				appPages[EnumPage.REPORT].push(page);
			}
			else
			{
				appPages[EnumPage.QUESTIONNAIRE].push(page);
			}
		}


		return appPages;
	}
}
