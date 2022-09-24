import {Injectable} from '@angular/core';
import {AlertController} from "@ionic/angular";


enum EnumAlert
{
	OK,
	OKCancel
}


@Injectable({
	providedIn: 'root'
})
export class ArrowAlertService
{
	constructor(private alert:AlertController)
	{
	}





	public async showInput(title:string, msg:string)
	{
		return new Promise((resolve) => {

			this.alert
				   .create({
					   header : title,
					   inputs : [
						   {
							   name       : 'input',
							   type       : 'text',
							   placeholder: msg
						   },
					   ],
					   buttons: [
						   {
							   text   : 'Cancel',
							   role   : 'cancel',
							   handler: () => {
								   resolve(null);
							   }
						   },
						   {
							   text   : 'OK',
							   handler: (data) => {
								   resolve(data.input.trim());
							   }
						   }
					   ]
				   })
				   .then((alert) => alert.present());
		});
	}





	public async show(msg:string, title?:string)
	{
		return this.createAlert(title, msg, EnumAlert.OK);
	}





	public success(msg:string, handler?:Function):void
	{
		let title:string = 'Successful';


		this.createAlert(title, msg, EnumAlert.OK)
			   .then(() => handler && handler());
	}





	public error(msg:string, handler?:Function):void
	{
		let title:string = 'Error';


		this.createAlert(title, msg, EnumAlert.OK)
			   .then(() => handler && handler());
	}





	public confirmDelete(handler?:Function):void
	{
		let title:string = 'Delete';
		let message:string = 'Are you sure about this?';


		this.createAlert(title, message, EnumAlert.OKCancel)
			   .then((value) => handler && handler(value));
	}





	private createAlert(title:string, msg:string, type:EnumAlert):Promise<any>
	{
		let buttons:any[] = [];


		return new Promise((resolve, reject) => {

			buttons.unshift({
				text   : 'OK',
				handler: () => resolve(true)
			});


			if (type == EnumAlert.OKCancel)
			{
				buttons.unshift({
					text    : 'Cancel',
					role    : 'cancel',
					cssClass: 'secondary',
					handler : () => resolve(false)
				});
			}


			this.alert
				   .create({
					   header         : title,
					   message        : msg,
					   buttons        : buttons,
					   backdropDismiss: false
				   })
				   .then((value) => value.present())
				   .catch((error) => reject(error));
		});
	}
}
