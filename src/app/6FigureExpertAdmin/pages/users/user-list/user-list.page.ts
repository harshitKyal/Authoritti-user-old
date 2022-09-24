import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {ArrowToastService} from "../../../../Arrow/services/toast/arrow-toast.service";
import {BaseList} from "../../../../base/BaseList";
import {map} from "rxjs/operators";
import {EnumField} from "../../../../enums/Enums";


@Component({
	selector   : 'app-user-list',
	templateUrl: './user-list.page.html',
	styleUrls  : ['./user-list.page.scss'],
})
export class UserListPage extends BaseList
{
	public users$;





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





	ngOnInit()
	{
		super.ngOnInit();


		this.users$ = this.route.data
			   .pipe(
					 map((data) => data[EnumField.USERS])
			   );
	}
}
