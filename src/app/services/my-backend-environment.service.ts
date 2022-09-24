import {Injectable} from '@angular/core';
import {ArrowBackendEnvironmentService} from "../Arrow/services/backends/base/arrow-backend-environment.service";
import {ArrowVOEnvironment} from "../Arrow/vo/ArrowVOEnvironment";


@Injectable({
	providedIn: 'root'
})
export class MyBackendEnvironmentService extends ArrowBackendEnvironmentService
{
	constructor()
	{
		super();

		this.environments = [
			//   DEV
			new ArrowVOEnvironment({
				key       : "13673",
				secret    : "b300c23d-3577-4481-8262-4fc10a1fc949",
				credential: "1.0.0",
			}),
		];
	}
}
