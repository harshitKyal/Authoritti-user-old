import {Component} from '@angular/core';
import {NavController} from "@ionic/angular";
import {ArrowSplashPage} from "../../../Arrow/pages/arrow-splash/arrow-splash.page";
import {ArrowBackendService} from "../../../Arrow/services/backends/base/arrow-backend.service";
import {ArrowLoaderService} from "../../../Arrow/services/loader/arrow-loader.service";
import {ArrowMenuService} from "../../../Arrow/services/menu/arrow-menu.service";
import {EnumRoute} from "../../../enums/Enums";


@Component({
	selector   : 'app-splash',
	templateUrl: '../../../Arrow/pages/arrow-splash/arrow-splash.page.html',
	styleUrls  : ['../../../Arrow/pages/arrow-splash/arrow-splash.page.scss'],
})
export class SplashPage extends ArrowSplashPage
{
	constructor(backendService:ArrowBackendService,
			  loaderService:ArrowLoaderService,
			  navController:NavController,
			  menuService:ArrowMenuService)
	{
		super(backendService, loaderService, navController, menuService);
	}





	ngOnInit():void
	{
		this.pageAfterSplash = EnumRoute.LOGIN;


		super.ngOnInit();
	}
}
