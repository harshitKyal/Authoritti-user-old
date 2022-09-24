import {Injectable} from '@angular/core';
import {NavController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ArrowUtils} from "../../utils/ArrowUtils";
import {ArrowNavigationOptions} from "./interfaces/ArrowNavigationOptions";


@Injectable({
	providedIn: 'root'
})
export class ArrowNavigationService
{
	private _oldRoot:string;
	private _root:string;





	constructor(private router:Router,
			  private navController:NavController)
	{
	}





	public get root():string
	{
		if (this._oldRoot === this.router.url)
		{
			return this._root;
		}


		this._oldRoot = this.router.url;
		this._root = ArrowUtils.getRoot(this.router.url);


		return this._root;
	}





	//--------------------------------------------------------------------------
	//
	// Navigate
	//
	//--------------------------------------------------------------------------
	public forwardWithUrl(route:any, options?:ArrowNavigationOptions):void
	{
		let newRoute:string = this.url(route, options);


		this.forward(newRoute, options);
	}





	public backWithUrl(route:any, options?:ArrowNavigationOptions):void
	{
		let newRoute:string = this.url(route, options);


		this.back(newRoute, options);
	}





	public forward(route:any, options?:ArrowNavigationOptions):void
	{
		options && options.id ?
			   this.navController.navigateForward([route, options.id], options) :
			   this.navController.navigateForward(route, options);


		console.log('forward', {route, options});
	}





	public back(route:any, options?:ArrowNavigationOptions):void
	{
		options && options.id ?
			   this.navController.navigateBack([route, options.id], options) :
			   this.navController.navigateBack(route, options);


		console.log('back', {route, options});
	}





	public replace(route:any, options?:ArrowNavigationOptions):void
	{
		let newRoute:string = route;


		if (!options)
		{
			options = {};
		}


		if (options.replaceUrl == undefined)
		{
			options.replaceUrl = true;
		}


		if (options.skipUrlCount)
		{
			newRoute = `${ArrowUtils.getUrl(this.router.url, options.skipUrlCount)}/${route}`;
		}


		this.navController.navigateRoot(newRoute, options);


		console.log('replace', {newRoute, options});
	}





	//--------------------------------------------------------------------------
	//
	// Private
	//
	//--------------------------------------------------------------------------
	private url(route:any, options?:ArrowNavigationOptions):string
	{
		let newUrl:string = this.router.url;


		if (options && options.skipUrlCount)
		{
			newUrl = ArrowUtils.getUrl(newUrl, options.skipUrlCount);
		}


		return `${newUrl}/${route}`;
	}
}
