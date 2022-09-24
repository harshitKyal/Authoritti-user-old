import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {VOQuestion} from "../../../../vo/VOQuestion";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormBuilder, Validators} from "@angular/forms";
import {VOTextArea} from "../../../../vo/VOTextArea";


@Component({
	selector   : 'comp-text-area',
	templateUrl: './text-area.component.html',
	styleUrls  : ['./text-area.component.scss'],
})
export class TextAreaComponent extends BaseAddEditForm implements OnInit
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
		let textArea:VOTextArea = this.question.text_area || new VOTextArea();


		this.formAddEdit = this.formBuilder.group({
			title      : [this.question.title, Validators.required],
			description: [this.question.description],
			text_area  : this.formBuilder.group({
				placeholder: [textArea.placeholder],
			})
		});
	}





	onSubmit(value?:any):void
	{
		let question:VOQuestion = new VOQuestion({...this.question, ...value});


		this.eventSave.emit(question);
	}
}
