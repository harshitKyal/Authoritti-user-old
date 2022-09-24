import {Component, OnInit} from '@angular/core';
import {BaseAddEditForm} from "../../../../../../../base/BaseAddEditForm";
import {VOQuestion} from "../../../../../../../vo/VOQuestion";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../../../../services/backend.service";
import {FormBuilder} from "@angular/forms";
import {EnumField, EnumRoute, EnumType} from "../../../../../../../enums/Enums";
import {VOPage} from "../../../../../../../vo/VOPage";
import {UUID} from "angular2-uuid";


@Component({
	selector   : 'app-dynamic-questionnaire-add-edit',
	templateUrl: './questionnaire-dynamic-add-edit.page.html',
	styleUrls  : ['./questionnaire-dynamic-add-edit.page.scss'],
})
export class QuestionnaireDynamicAddEditPage extends BaseAddEditForm implements OnInit
{
	public page:VOPage;
	public template:VOQuestion;
	public canAddQuestion:boolean = true;





	constructor(router:Router,
			  route:ActivatedRoute,
			  navController:ArrowNavigationService,
			  alertService:ArrowAlertService,
			  loaderService:ArrowLoaderService,
			  backendService:BackendService,
			  formBuilder:FormBuilder)
	{
		super(router, route, navController, alertService, loaderService, backendService, formBuilder);
	}





	ngOnInit()
	{
		let id:string = this.route.snapshot.paramMap.get(EnumField.QUESTION_ID);


		this.page = this.backendService.currentPage;
		this.template = id ? this.page.questionnaire.template : new VOQuestion();


		this.itemType = EnumType.Page;
		this.itemName = "Template";


		this.routeBack = `${this.navController.root}/${EnumRoute.PAGES}/${EnumRoute.QUESTIONNAIRE_DYNAMIC_DETAIL}/${this.backendService.currentPage.auid}`;
		this.routeBackOnAdd = this.routeBack;
		this.routeBackOnEdit = this.routeBack;
		this.routeBackOnDelete = this.routeBackOnAdd;


		this.title = this.template.auid ?
				   "Edit Template" : "New Template";


		if (!this.template.auid)
		{
			this.canAddQuestion = !this.page.questionnaire.template;
		}
	}





	onSubmit(value?:any):void
	{
		let page:VOPage = new VOPage(this.page);
		page.questionnaire.template = value;


		if (value && !page.questionnaire.template.auid)
		{
			page.questionnaire.template.auid = UUID.UUID();
		}


		super.onSubmit(page);
	}





	deleteItem(item:any, handler?:Function):void
	{
		this.alertService.confirmDelete((yes) => {

			if (yes)
			{
				this.onSubmit(null);
			}
		});
	}





	postEditItem(item:any):void
	{
		super.postEditItem(item);


		if (!item.questionnaire.template)
		{
			this.msg = `${this.itemName} deleted.`;
		}
		else if (!this.template.auid)
		{
			this.msg = `${this.itemName} created.`;
		}
	}
}
