import {Component} from '@angular/core';
import {BaseDetail} from "../../../../../../base/BaseDetail";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../../../services/backend.service";
import {ArrowToastService} from "../../../../../../Arrow/services/toast/arrow-toast.service";


@Component({
	selector   : 'app-intro-detail',
	templateUrl: './intro-detail.page.html',
	styleUrls  : ['./intro-detail.page.scss'],
})
export class IntroDetailPage extends BaseDetail
{
	constructor(router:Router,
			  route:ActivatedRoute,
			  navController:ArrowNavigationService,
			  alertService:ArrowAlertService,
			  loaderService:ArrowLoaderService,
			  backendService:BackendService,
			  toastService:ArrowToastService)
	{
		super(router, route, navController, alertService, loaderService, backendService, toastService);
	}
}
