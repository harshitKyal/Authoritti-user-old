import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "../../../../../../../../services/backend.service";
import {EnumField, EnumPage, EnumRoute, EnumType} from "../../../../../../../../enums/Enums";
import {VOQuestion} from "../../../../../../../../vo/VOQuestion";
import {ArrowNavigationService} from "../../../../../../../../Arrow/services/navigation/arrow-navigation.service";
import {BaseAddEditForm} from "../../../../../../../../base/BaseAddEditForm";
import {FormBuilder} from "@angular/forms";
import {ArrowAlertService} from "../../../../../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../../../../../Arrow/services/loader/arrow-loader.service";


@Component({
	selector   : 'app-question-add-edit',
	templateUrl: './question-add-edit.page.html',
	styleUrls  : ['./question-add-edit.page.scss'],
})
export class QuestionAddEditPage extends BaseAddEditForm implements OnInit
{
	public question:VOQuestion;





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
		this.question = this.route.snapshot.data[EnumField.QUESTION_INFO];


		this.routeBack = `${this.navController.root}/${EnumRoute.PAGES}/${EnumRoute.QUESTIONNAIRE_DETAIL}/${this.backendService.currentPage.auid}`;
		this.routeBackOnAdd = this.routeBack;
		this.routeBackOnEdit = this.routeBack;
		this.routeBackOnDelete = this.routeBackOnAdd;


		this.title = this.question.auid ?
				   "Edit Question" : "New Question";


		this.itemType = EnumType.Question;
		this.itemName = EnumType[EnumType.Question];
		this.returnAfterAdd = false;
	}
}
