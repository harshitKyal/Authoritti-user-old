import {Injectable} from '@angular/core';
import {LoadingController} from "@ionic/angular";


@Injectable({
	providedIn: 'root'
})
export class ArrowLoaderService
{
	private inputLoader;





	constructor(private loader:LoadingController)
	{
	}





	public async show(msg?:string)
	{
		this.inputLoader = await this.loader.create({
			message: msg
		});


		return await this.inputLoader.present();
	}





	public async hide()
	{
		return await this.inputLoader.dismiss();
	}
}
