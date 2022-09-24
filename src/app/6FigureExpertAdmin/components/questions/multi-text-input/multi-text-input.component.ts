import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {VOQuestion} from "../../../../vo/VOQuestion";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {VOMultiTextInput} from "../../../../vo/VOMultiTextInput";
import {EnumField} from "../../../../enums/Enums";
import {UUID} from "angular2-uuid";


@Component({
	selector   : 'comp-multi-text-input',
	templateUrl: './multi-text-input.component.html',
	styleUrls  : ['./multi-text-input.component.scss'],
})
export class MultiTextInputComponent extends BaseAddEditForm implements OnInit
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
		let multiTextInput:VOMultiTextInput = this.question.multi_text_input || new VOMultiTextInput();


		this.formAddEdit = this.formBuilder.group({
			title      : [this.question.title, Validators.required],
			description: [this.question.description],
			inputs     : this.formBuilder.array(multiTextInput.inputs.map((item) => this.formBuilder.group({
					   auid       : {value: item.auid, disabled: true},
					   placeholder: item.input.placeholder
				   }))
			),
		});


		if (!multiTextInput.inputs.length)
		{
			this.onAddInput();
		}
	}





	public get inputs()
	{
		return (this.formAddEdit.get(EnumField.INPUTS) as FormArray).controls;
	}





	public onAddInput():void
	{
		(<FormArray>this.formAddEdit.controls[EnumField.INPUTS]).push(
			   this.formBuilder.group({
				   auid       : [UUID.UUID()],
				   placeholder: ['']
			   })
		);
	}





	public onRemoveInput(index:number):void
	{
		(<FormArray>this.formAddEdit.controls[EnumField.INPUTS]).removeAt(index);
	}





	onSubmit(value?:any):void
	{
		value.multi_text_input = {
			inputs: value.inputs.map((item) => {
				return {auid: item.auid, input: {placeholder: item.placeholder.trim()}}
			})
		};


		let question:VOQuestion = new VOQuestion({...this.question, ...value});


		this.eventSave.emit(question);
	}
}
