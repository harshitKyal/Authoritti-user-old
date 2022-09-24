import {Component, OnInit} from '@angular/core';
import {BaseAddEditForm} from "../../../../base/BaseAddEditForm";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../../../../services/backend.service";
import {FormBuilder} from "@angular/forms";
import {EnumField, EnumRoute} from "../../../../enums/Enums";
import {VOUser} from "../../../../vo/VOUser";
import {VOError} from "../../../../vo/VOError";
import {TitleCasePipe} from "@angular/common";


@Component({
	selector   : 'app-user-add-edit',
	templateUrl: './user-add-edit.page.html',
	styleUrls  : ['./user-add-edit.page.scss'],
})
export class UserAddEditPage extends BaseAddEditForm implements OnInit
{
	public user:VOUser;





	constructor(router:Router,
			  route:ActivatedRoute,
			  navController:ArrowNavigationService,
			  alertService:ArrowAlertService,
			  loaderService:ArrowLoaderService,
			  backendService:BackendService,
			  formBuilder:FormBuilder,
			  private titleCasePipe:TitleCasePipe)
	{
		super(router, route, navController, alertService, loaderService, backendService, formBuilder);
	}





	ngOnInit()
	{
		this.user = this.route.snapshot.data[EnumField.INFO];


		this.routeBackOnAdd = `${this.navController.root}/${EnumRoute.USER_LIST}`;
		this.routeBackOnEdit = `${this.navController.root}/${EnumRoute.USER_LIST}`;
		this.routeBackOnDelete = this.routeBackOnAdd;
		this.routeBack = this.user.entityId ? this.routeBackOnEdit : this.routeBackOnAdd;


		this.title = "Edit User";


		this.formAddEdit = this.formBuilder.group({
			active: [this.user.active],
			role  : [this.titleCasePipe.transform(this.user.role)],
			name  : [this.user.name],
			email : [this.user.username],
		});
	}





	onSubmit(value?:any):void
	{
		this.user.active = value.active;


		this.loaderService.show()
			   .then(() => this.backendService.saveUser(this.user))
			   .then(() => {

				   this.alertService.success("User updated.");
				   this.navController.back(this.routeBackOnEdit);
			   })

			   .catch((error:VOError) => this.alertService.error(error.msg))
			   .finally(() => this.loaderService.hide());
	}





	public changeUserRole(checked:boolean, appId:string, field:string):void
	{
		if (!this.user.user_roles[appId])
		{
			this.user.user_roles[appId] = {};
		}


		this.user.user_roles[appId][field] = checked;
	}
}
