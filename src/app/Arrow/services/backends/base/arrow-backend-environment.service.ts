import {Injectable} from '@angular/core';
import {ArrowVOEnvironment} from "../../../vo/ArrowVOEnvironment";


@Injectable({
	providedIn: 'root'
})
export class ArrowBackendEnvironmentService
{
	public environments:ArrowVOEnvironment[];





	constructor()
	{
	}





	get hasEnvironments():boolean
	{
		return this.environments && this.environments.length > 1;
	}





	get defaultEnvironment():ArrowVOEnvironment
	{
		if (this.environments && this.environments.length)
		{
			return this.environments[0];
		}


		throw new Error("No Environment found.")
	}
}
