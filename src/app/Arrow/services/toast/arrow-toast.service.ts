import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";


@Injectable({
	providedIn: 'root'
})
export class ArrowToastService
{
	private isSave:boolean;





	constructor(private toast:ToastController)
	{
	}





	public save(msg:string, handler?:Function):void
	{
		if (this.isSave)
		{
			return;
		}
		this.isSave = true;


		this.toast
			   .create({
				   message: msg,
				   buttons: [
					   {
						   text   : 'Yes',
						   handler: () => {

							   this.isSave = false;
							   handler && handler();
						   }
					   },
					   {
						   text   : 'No',
						   role   : 'cancel',
						   handler: () => {
							   this.isSave = false;
						   }
					   }
				   ]
			   })

			   .then((value) => value.present());
	}





	public showError(msg:string):void
	{
		this.show(msg, "gToastError");
	}





	public showSuccess(msg:string):void
	{
		this.show(msg, "gToastSuccess");
	}





	public show(msg:string, type?:string):void
	{
		this.toast
			   .create({
				   message : msg,
				   buttons : [
					   {
						   text: 'OK',
					   },
				   ],
				   duration: 2000,
				   cssClass: type,
				   position: 'top'
			   })

			   .then((toast) => toast.present());
	}
}
