import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BackendService} from "../../../../services/backend.service";
import {EnumField} from "../../../../enums/Enums";
import {VOQuestion} from "../../../../vo/VOQuestion";


@Injectable({
	providedIn: 'root'
})
export class ResolveQuestionAddEditGuard implements Resolve<VOQuestion>
{
	constructor(private backendService:BackendService)
	{
	}





	resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOQuestion> | Promise<VOQuestion> | VOQuestion
	{
		console.log('ResolveQuestionAddEditGuard');


		let id:string = route.paramMap.get(EnumField.QUESTION_ID);


		return this.backendService.getQuestion(id) || new VOQuestion();
	}
}
