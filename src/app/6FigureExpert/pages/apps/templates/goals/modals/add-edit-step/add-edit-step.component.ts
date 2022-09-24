import {Component, Input, OnInit} from '@angular/core';
import {Step} from "../../vo/VOGoal";
import {ModalController} from "@ionic/angular";


@Component({
	selector   : 'app-add-edit-step',
	templateUrl: './add-edit-step.component.html',
	styleUrls  : ['./add-edit-step.component.scss'],
})
export class AddEditStepComponent implements OnInit
{
	@Input() step:Step

	public title:string;

	public inputType:string = "deliverable";
	public inputName:string;
	public inputDescription:string;





	constructor(public modalController:ModalController)
	{
	}





	ngOnInit()
	{
		this.title = this.step ? "Update" : "New";


		if (this.step)
		{
			this.inputType = this.step.type;
			this.inputName = this.step.name;
			this.inputDescription = this.step.description;
		}
	}





	public save():void
	{
		let type:string = this.inputType;
		let name:string = this.inputName && this.inputName.trim();
		let description:string = this.inputDescription && this.inputDescription.trim()


		if (!name)
		{
			this.cancel();
		}
		else
		{
			this.modalController.dismiss({
					   type       : type,
					   name       : name,
					   description: description,
				   },
				   "dismissed");
		}
	}





	public cancel():void
	{
		this.modalController.dismiss();
	}
}
