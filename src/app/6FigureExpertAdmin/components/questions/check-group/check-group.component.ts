import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {VOQuestion} from "../../../../vo/VOQuestion";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VOCheckGroup} from "../../../../vo/VOCheckGroup";


@Component({
	selector   : 'comp-check-group',
	templateUrl: './check-group.component.html',
	styleUrls  : ['./check-group.component.scss'],
})
export class CheckGroupComponent extends BaseAddEditForm implements OnInit
{
	@Input('data') question:VOQuestion;

	@Output() eventSave:EventEmitter<any> = new EventEmitter();





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
		let group:VOCheckGroup = this.question.check_group || new VOCheckGroup();


		this.formAddEdit = new FormGroup({
			source     : new FormControl(this.question.source, Validators.required),
			check_group: new FormGroup({
				min_value: new FormControl(group.min_value),
				max_value: new FormControl(group.max_value),
			}),
		});
	}





	onSubmit(value?:any):void
	{
		let question:VOQuestion = new VOQuestion({...this.question, ...value});


		this.eventSave.emit(question);
	}
}
