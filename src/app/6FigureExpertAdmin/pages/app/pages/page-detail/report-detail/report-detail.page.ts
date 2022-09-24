import {Component} from '@angular/core';
import {BaseDetail} from "../../../../../../base/BaseDetail";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../../../services/backend.service";
import {ArrowToastService} from "../../../../../../Arrow/services/toast/arrow-toast.service";


@Component({
	selector   : 'app-report-detail',
	templateUrl: './report-detail.page.html',
	styleUrls  : ['./report-detail.page.scss'],
})
export class ReportDetailPage extends BaseDetail
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
