import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseAddEdit} from "./BaseAddEdit";
import {ArrowAlertService} from "../Arrow/services/alert/arrow-alert.service";
import {ArrowNavigationService} from "../Arrow/services/navigation/arrow-navigation.service";
import {ArrowLoaderService} from "../Arrow/services/loader/arrow-loader.service";
import {VOError} from "../vo/VOError";
import {EnumField} from "../enums/Enums";
import {BackendService} from "../services/backend.service";


export class BaseAddEditForm extends BaseAddEdit
{
	public formAddEdit:FormGroup;

	public itemName:string;
	public msg:string;
	public returnAfterAdd:boolean = true;





	constructor(router:Router,
			  route:ActivatedRoute,
			  navController:ArrowNavigationService,
			  alertService:ArrowAlertService,
			  loaderService:ArrowLoaderService,
			  backendService:BackendService,
			  public formBuilder:FormBuilder)
	{
		super(router, route, navController, alertService, loaderService, backendService);
	}





	public onSubmit(value?:any):void
	{
		this.newItem = value;


		this.loaderService.show()
			   .then(() => {

				   return this.newItem[EnumField.AUID] ?
						 this.editItem() :
						 this.addItem();
			   })
			   .catch((error:VOError) => this.alertService.error(error.msg))
			   .finally(() => this.loaderService.hide());
	}





	addItem():Promise<any>
	{
		this.msg = `${this.itemName} created.`;


		return this.backendService.addItem(this.itemType, this.newItem)
			   .then(() => {

				   this.postAddItem(this.newItem);

				   this.alertService.success(this.msg, () => {

					   if (this.returnAfterAdd)
					   {
						   this.navController.back(this.routeBackOnAdd);
					   }
				   });
			   });
	}





	editItem():Promise<any>
	{
		this.msg = `${this.itemName} updated.`;


		return this.backendService.editItem(this.itemType, this.newItem)
			   .then(() => {

				   this.postEditItem(this.newItem);

				   this.alertService.success(this.msg, () => {
					   this.navController.back(this.routeBackOnEdit);
				   });
			   });
	}





	deleteItem(item:any, handler?:Function):void
	{
		this.msg = `${this.itemName} deleted.`;


		super.deleteItem(item, (value) => {

			if (value)
			{
				this.loaderService.show()
					   .then(() => this.backendService.deleteItem(this.itemType, item))
					   .then(() => {

						   this.postDeleteItem(item);

						   this.alertService.success(this.msg, () => {
							   this.navController.back(this.routeBackOnDelete)
						   })
					   })
					   .catch((error:VOError) => this.alertService.error(error.msg))
					   .finally(() => this.loaderService.hide());
			}
		});
	}





	public postAddItem(item:any):void
	{
	}





	public postEditItem(item:any):void
	{
	}





	public postDeleteItem(item:any):void
	{
	}
}
