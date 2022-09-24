import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VOQuestion} from "../../../../vo/VOQuestion";
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UUID} from "angular2-uuid";
import {VOTableTrait} from "../../../../vo/VOTableTrait";


@Component({
	selector   : 'comp-table-trait',
	templateUrl: './table-trait.component.html',
	styleUrls  : ['./table-trait.component.scss'],
})
export class TableTraitComponent extends BaseAddEditForm implements OnInit
{
	@Input('data') question:VOQuestion;

	@Output() eventSave:EventEmitter<any> = new EventEmitter();

	public columns:any[] = [];
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
		let table:VOTableTrait = this.question.table_trait || new VOTableTrait();
		this.columns = table.columns.concat();
		this.options = table.options.concat();


		this.formAddEdit = new FormGroup({
			source     : new FormControl(this.question.source, Validators.required),
			table_trait: new FormGroup({
				id: new FormControl(table.id, Validators.required)
			})
		});
	}





	public onAddOption(value:any, field:string):void
	{
		this[field].push({auid: UUID.UUID(), name: value.trim()});
	}





	public onRemoveOption(index:number, field:string):void
	{
		this[field].splice(index, 1);
	}





	onSubmit(value?:any):void
	{
		value.table_trait.columns = this.columns;
		value.table_trait.options = this.options;


		let question:VOQuestion = new VOQuestion({...this.question, ...value});


		this.eventSave.emit(question);
	}
}
