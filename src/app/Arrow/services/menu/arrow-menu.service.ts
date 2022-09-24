import {Injectable} from '@angular/core';
import {MenuController} from "@ionic/angular";


@Injectable({
	providedIn: 'root'
})
export class ArrowMenuService
{
	constructor(private menu:MenuController)
	{
	}





	public async show(id?:string)
	{
		return await this.menu.enable(true, id);
	}





	public async hide(id?:string)
	{
		return await this.menu.enable(false, id);
	}





	public async close()
	{
		return await this.menu.close();
	}
}
