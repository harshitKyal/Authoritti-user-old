import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {VOSlider} from "../../../../vo/VOSlider";
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {VOQuestion} from "../../../../vo/VOQuestion";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";


@Component({
	selector   : 'comp-slider',
	templateUrl: './slider.component.html',
	styleUrls  : ['./slider.component.scss'],
})
export class SliderComponent extends BaseAddEditForm implements OnInit
{
	@Input('data') question:VOQuestion;

	@Output() eventSave:EventEmitter<any> = new EventEmitter();

	public tags:any[];





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
		let slider:VOSlider = this.question.slider || new VOSlider();
		this.tags = slider.tags.concat();


		this.formAddEdit = this.formBuilder.group({
			title      : [this.question.title, Validators.required],
			description: [this.question.description],
			slider     : this.formBuilder.group({
				min_value      : [slider.min_value, Validators.required],
				max_value      : [slider.max_value, Validators.required],
				default_answer : [slider.default_answer, Validators.required],
				min_value_label: [slider.min_value_label],
				max_value_label: [slider.max_value_label],
			})
		});
	}





	public onAddTag(value:any):void
	{
		this.tags.push(value);
	}





	public onRemoveTag(index:number):void
	{
		this.tags.splice(index, 1);
	}





	onSubmit(value?:any):void
	{
		value.slider.tags = this.tags;


		let question:VOQuestion = new VOQuestion({...this.question, ...value});


		this.eventSave.emit(question);
	}
}
