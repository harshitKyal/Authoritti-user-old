import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {VOQuestion} from "../../../../vo/VOQuestion";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VOTableDropDown} from "../../../../vo/VOTableDropDown";
import {EnumField} from "../../../../enums/Enums";
import {UUID} from "angular2-uuid";


@Component({
	selector   : 'comp-table-drop-down',
	templateUrl: './table-drop-down.component.html',
	styleUrls  : ['./table-drop-down.component.scss'],
})
export class TableDropDownComponent extends BaseAddEditForm implements OnInit
{
	@Input('data') question:VOQuestion;

	@Output() eventSave:EventEmitter<any> = new EventEmitter();

	public options:any[] = [];





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
		let table:VOTableDropDown = this.question.table_drop_down || new VOTableDropDown();
		this.options = table.options.concat();


		this.formAddEdit = new FormGroup({
			source         : new FormControl(this.question.source, Validators.required),
			table_drop_down: new FormGroup({
				columns: new FormArray(table.columns.map((item) => {
					return new FormControl(item, Validators.required)
				})),
			}),
		});
	}





	public get inputColumns()
	{
		return this.formAddEdit.get([EnumField.TABLE_DROP_DOWN, EnumField.COLUMNS]) as FormArray;
	}





	public onAddOption(value:any):void
	{
		this.options.push({auid: UUID.UUID(), name: value.trim()});
	}





	public onRemoveOption(index:number):void
	{
		this.options.splice(index, 1);
	}





	onSubmit(value?:any):void
	{
		value.table_drop_down.options = this.options;


		let question:VOQuestion = new VOQuestion({...this.question, ...value});


		this.eventSave.emit(question);
	}
}
