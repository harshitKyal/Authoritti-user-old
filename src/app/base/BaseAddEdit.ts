import {Base} from "./Base";
import {ActivatedRoute, Router} from "@angular/router";
import {ArrowNavigationService} from "../Arrow/services/navigation/arrow-navigation.service";
import {EnumRoute, EnumType} from "../enums/Enums";
import {ArrowAlertService} from "../Arrow/services/alert/arrow-alert.service";
import {ArrowLoaderService} from "../Arrow/services/loader/arrow-loader.service";
import {BackendService} from "../services/backend.service";
import {UserRole, VOUser} from "../vo/VOUser";


export class BaseAddEdit extends Base
{
	public routeBack:string;
	public routeBackOnAdd:string;
	public routeBackOnEdit:string;
	public routeBackOnDelete:string;

	public title:string;
	public newItem:any;
	public itemType:EnumType;





	constructor(public router:Router,
			  public route:ActivatedRoute,
			  public navController:ArrowNavigationService,
			  public alertService:ArrowAlertService,
			  public loaderService:ArrowLoaderService,
			  public backendService:BackendService)
	{
		super();
	}





	public addItem():Promise<any>
	{
		return null;
	}





	public editItem():Promise<any>
	{
		return null;
	}





	public deleteItem(item:any, handler?:Function):void
	{
		this.alertService.confirmDelete(handler);
	}





	public editPage(id:string):void
	{
		this.navController.forwardWithUrl(EnumRoute.PAGE_EDIT, {id: id, skipUrlCount: 2});
	}





	public get signedInUser():VOUser
	{
		return this.backendService.signedInUser;
	}





	public get userRoles():UserRole
	{
		return this.signedInUser.user_roles[this.backendService.currentApp.entityId];
	}
}
