import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {EnumField, EnumRoute, EnumType} from "../../../../enums/Enums";
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormBuilder, Validators} from "@angular/forms";
import {VOApp} from "../../../../vo/VOApp";


@Component({
	selector       : 'app-apps-add-edit',
	templateUrl    : './apps-add-edit.page.html',
	styleUrls      : ['./apps-add-edit.page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppsAddEditPage extends BaseAddEditForm implements OnInit
{
	public app:VOApp;





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
		this.itemType = EnumType.App;
		this.itemName = EnumType[EnumType.App];


		this.app = this.route.snapshot.data[EnumField.APP_INFO];


		this.routeBackOnAdd = `${this.navController.root}/${EnumRoute.APP_LIST}`;
		this.routeBackOnEdit = `${this.navController.root}/${EnumRoute.APP_LIST}`;
		this.routeBackOnDelete = this.routeBackOnAdd;
		this.routeBack = this.app.auid ? this.routeBackOnEdit : this.routeBackOnAdd;


		this.title = this.app.auid ?
			   "Edit App" : "New App";


		this.formAddEdit = this.formBuilder.group({
			type  : [{value: this.app.type, disabled: this.app.auid}],
			active: [this.app.active],
			name  : [this.app.name, Validators.required],
			title : [this.app.title, Validators.required],
			icon  : [this.app.icon],
		});
	}





	onSubmit(value?:any):void
	{
		let app:VOApp = new VOApp({...this.app, ...value});
		app.url = app.name
			   .split(' ')
			   .join('-')
			   .toLowerCase();


		super.onSubmit(app);
	}
}
