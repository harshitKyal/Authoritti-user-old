import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VOQuestion} from "../../../../vo/VOQuestion";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormBuilder, Validators} from "@angular/forms";
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {VORadio} from "../../../../vo/VORadio";
import {UUID} from "angular2-uuid";
import {EnumField} from "../../../../enums/Enums";


@Component({
	selector   : 'comp-radio',
	templateUrl: './radio.component.html',
	styleUrls  : ['./radio.component.scss'],
})
export class RadioComponent extends BaseAddEditForm implements OnInit
{
	@Input('data') question:VOQuestion;

	@Output() eventSave:EventEmitter<any> = new EventEmitter();

	public options:any[];





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
		let radio:VORadio = this.question.radio || new VORadio();
		this.options = radio.options.concat();


		this.formAddEdit = this.formBuilder.group({
			title      : [this.question.title, Validators.required],
			description: [this.question.description],
			radio      : this.formBuilder.group({
				has_other: [radio.has_other],
			})
		});


		// other should be last option
		this.removeOther();
	}





	public addOther(value:any):void
	{
		if (value.radio.has_other)
		{
			value.radio.options.push({auid: EnumField.OTHER, name: "Other"});
		}
	}





	public removeOther():void
	{
		let index:number = this.options.findIndex((item) => item.auid == EnumField.OTHER);
		if (index != -1)
		{
			this.options.splice(index, 1);
		}
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
		value.radio.options = this.options.concat();


		// other should be last option
		this.addOther(value);


		let question:VOQuestion = new VOQuestion({...this.question, ...value});


		this.eventSave.emit(question);
	}
}
