import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {VOGoal} from "../../vo/VOGoal";


@Component({
	selector   : 'app-add-edit-goal',
	templateUrl: './add-edit-goal.component.html',
	styleUrls  : ['./add-edit-goal.component.scss'],
})
export class AddEditGoalComponent implements OnInit
{
	@Input() goal:VOGoal

	public title:string;

	public inputName:string;
	public inputDescription:string;





	constructor(public modalController:ModalController)
	{
	}





	ngOnInit()
	{
		this.title = this.goal ? "Update" : 'New';


		if (this.goal)
		{
			this.inputName = this.goal.name;
			this.inputDescription = this.goal.description;
		}
	}





	public save():void
	{
		let name:string = this.inputName && this.inputName.trim();
		let description:string = this.inputDescription && this.inputDescription.trim()


		if (!name)
		{
			this.cancel();
		}
		else
		{
			this.modalController.dismiss({
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
