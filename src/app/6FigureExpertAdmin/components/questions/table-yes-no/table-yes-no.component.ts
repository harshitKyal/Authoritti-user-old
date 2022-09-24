import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {VOQuestion} from "../../../../vo/VOQuestion";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormBuilder, Validators} from "@angular/forms";
import {VOTableYesNo} from "../../../../vo/VOTableYesNo";


@Component({
	selector   : 'comp-table-yes-no',
	templateUrl: './table-yes-no.component.html',
	styleUrls  : ['./table-yes-no.component.scss'],
})
export class TableYesNoComponent extends BaseAddEditForm implements OnInit
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
		let tableYesNo:VOTableYesNo = this.question.table_yes_no || new VOTableYesNo();


		this.formAddEdit = this.formBuilder.group({
			source      : [this.question.source, Validators.required],
			table_yes_no: this.formBuilder.group({
				yes_label: tableYesNo.yes_label,
				no_label : tableYesNo.no_label,
			})
		});
	}





	onSubmit(value?:any):void
	{
		let question:VOQuestion = new VOQuestion({...this.question, ...value});


		this.eventSave.emit(question);
	}
}
