import {Component} from '@angular/core';
import {BaseList} from "../../../../../../base/BaseList";
import {VOPage} from "../../../../../../vo/VOPage";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../../../services/backend.service";
import {ArrowToastService} from "../../../../../../Arrow/services/toast/arrow-toast.service";
import {EnumField, EnumRoute, EnumType} from "../../../../../../enums/Enums";
import {VOError} from "../../../../../../vo/VOError";
import {untilDestroyed} from "ngx-take-until-destroy";


@Component({
	selector   : 'app-template-detail',
	templateUrl: './questionnaire-dynamic-detail.page.html',
	styleUrls  : ['./questionnaire-dynamic-detail.page.scss'],
})
export class QuestionnaireDynamicDetailPage extends BaseList
{
	public page:VOPage;





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


		this.itemType = EnumType.Page;


		this.route.data
			   .pipe(untilDestroyed(this))
			   .subscribe((data) => this.page = data[EnumField.PAGE_INFO]);


		this.routeBack = `${this.navController.root}/${EnumRoute.PAGES}`;
	}





	deleteItem(item:any, handler?:Function):void
	{
		this.alertService.confirmDelete((yes) => {

			if (yes)
			{
				let page:VOPage = new VOPage(this.page);
				page.questionnaire.template = null;


				this.loaderService.show()
					   .then(() => this.backendService.editItem(this.itemType, page))
					   .then(() => this.page.questionnaire.template = null)
					   .catch((error:VOError) => this.alertService.error(error.msg))
					   .finally(() => this.loaderService.hide());
			}
		});
	}





	public showDetail(templateId:string):void
	{
		if (this.userRoles && this.userRoles.can_edit)
		{
			this.navController.forwardWithUrl(EnumRoute.QUESTION_DYNAMIC_EDIT, {id: templateId});
		}
	}
}
