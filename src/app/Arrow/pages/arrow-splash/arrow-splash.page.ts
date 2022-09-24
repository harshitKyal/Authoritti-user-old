import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {finalize} from "rxjs/operators";
import {ArrowLoaderService} from "../../services/loader/arrow-loader.service";
import {ArrowVOEnvironment} from "../../vo/ArrowVOEnvironment";
import {ArrowBackendService} from "../../services/backends/base/arrow-backend.service";
import {Subscription} from "rxjs";
import {EnumField} from "../../../enums/Enums";
import {ArrowMenuService} from "../../services/menu/arrow-menu.service";


@Component({
	selector   : 'app-splash',
	templateUrl: './arrow-splash.page.html',
	styleUrls  : ['./arrow-splash.page.scss'],
})
export class ArrowSplashPage implements OnInit, OnDestroy
{
	private initSource:Subscription;

	public pageAfterSplash:string;





	constructor(public backendService:ArrowBackendService,
			  public loaderService:ArrowLoaderService,
			  public navController:NavController,
			  public menuService:ArrowMenuService)
	{
	}





	ngOnInit():void
	{
		this.menuService.hide(EnumField.LEFT_MENU);


		if (!this.backendService.hasEnvironments)
		{
			this.onInitBackend(this.backendService.defaultEnvironment);
		}
	}





	ngOnDestroy():void
	{
		this.initSource.unsubscribe();
	}





	public onInitBackend(env:ArrowVOEnvironment):void
	{
		this.loaderService.show("Initializing")
			   .then(() => {

				   this.initSource = this.backendService.initialize(env)
						 .pipe(
							    finalize(() => this.loaderService.hide())
						 )
						 .subscribe(
							    () => {
								    this.navController.navigateRoot(this.pageAfterSplash, {replaceUrl: true});
							    },
							    () => {
								    console.log("error");
							    });
			   });
	}
}
