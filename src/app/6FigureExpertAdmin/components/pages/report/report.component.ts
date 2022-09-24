import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {VOPage} from "../../../../vo/VOPage";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormBuilder, Validators} from "@angular/forms";
import {VOReport} from "../../../../vo/VOReport";


@Component({
	selector   : 'comp-report',
	templateUrl: './report.component.html',
	styleUrls  : ['./report.component.scss'],
})
export class ReportComponent extends BaseAddEditForm implements OnInit
{
	@Input('data') page:VOPage;

	@Output() eventSave:EventEmitter<any> = new EventEmitter();

	public reportExits:boolean;





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
		let report:VOReport = this.page.report || new VOReport();


		// check if new
		if (!this.page.auid)
		{
			this.reportExits = this.backendService.isReportAlreadyAdded();
		}


		this.formAddEdit = this.formBuilder.group({
			formula: [{value: report.formula, disabled: this.reportExits}, Validators.required],
		});
	}





	onSubmit(value?:any):void
	{
		let page:VOPage = new VOPage(this.page);
		page.title = "Report";
		page.report = value;


		this.eventSave.emit(page);
	}





	compareById(a, b)
	{
		return a.code === b.code;
	}
}
