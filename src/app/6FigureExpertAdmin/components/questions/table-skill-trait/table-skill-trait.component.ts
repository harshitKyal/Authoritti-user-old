import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {VOQuestion} from "../../../../vo/VOQuestion";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormBuilder, Validators} from "@angular/forms";
import {VOTableSkillTrait} from "../../../../vo/VOTableSkillTrait";


@Component({
	selector   : 'comp-table-skill-trait',
	templateUrl: './table-skill-trait.component.html',
	styleUrls  : ['./table-skill-trait.component.scss'],
})
export class TableSkillTraitComponent extends BaseAddEditForm implements OnInit
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
		let table:VOTableSkillTrait = this.question.table_skill_trait || new VOTableSkillTrait();


		this.formAddEdit = this.formBuilder.group({
			source           : [this.question.source, Validators.required],
			table_skill_trait: this.formBuilder.group({
				id    : [table.id, Validators.required],
				filter: [table.filter]
			})
		});
	}





	onSubmit(value?:any):void
	{
		let question:VOQuestion = new VOQuestion({...this.question, ...value});


		this.eventSave.emit(question);
	}
}
