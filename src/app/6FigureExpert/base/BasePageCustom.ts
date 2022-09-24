import {PageService} from "../services/page.service";
import {ArrowNavigationService} from "../../Arrow/services/navigation/arrow-navigation.service";
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../../services/backend.service";
import {BasePage} from "./BasePage";
import {ArrowLoaderService} from "../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../Arrow/services/alert/arrow-alert.service";
import {VOError} from "../../vo/VOError";


export class BasePageCustom extends BasePage
{
	constructor(route:ActivatedRoute,
			  navController:ArrowNavigationService,
			  pageService:PageService,
			  backendService:BackendService,
			  loaderService:ArrowLoaderService,
			  alertService:ArrowAlertService)
	{
		super(route, navController, pageService, backendService, loaderService, alertService);
	}





	reset()
	{
	}





	onNext(submit?:boolean):void
	{
		if (submit)
		{
			this.loaderService.show("Submitting...")
				   .then(() => this.pageService.saveSession())
				   .then(() => super.onNext(submit))
				   .catch((error:VOError) => this.alertService.error(error.msg))

				   .finally(() => this.loaderService.hide());
		}
		else
		{
			super.onNext(submit);
		}
	}





	public filterNumericInput(value:any):void
	{
		if (value.key < '0' || value.key > '9')
		{
			value.preventDefault();
			return;
		}
	}
}
