import {Component} from '@angular/core';
import {Step, VOGoal} from "./vo/VOGoal";
import {BasePageCustom} from "../../../../base/BasePageCustom";
import {ActivatedRoute} from "@angular/router";
import {ArrowNavigationService} from "../../../../../Arrow/services/navigation/arrow-navigation.service";
import {PageService} from "../../../../services/page.service";
import {BackendService} from "../../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../../Arrow/services/alert/arrow-alert.service";
import {ModalController} from "@ionic/angular";
import {AddEditGoalComponent} from "./modals/add-edit-goal/add-edit-goal.component";
import {UUID} from "angular2-uuid";
import {AddEditStepComponent} from "./modals/add-edit-step/add-edit-step.component";


declare var introJs;


@Component({
	selector   : 'app-goal',
	templateUrl: './goals.page.html',
	styleUrls  : ['./goals.page.scss'],
})
export class GoalsPage extends BasePageCustom
{
	public goals:VOGoal[];
	public selectedGoal:VOGoal;





	constructor(route:ActivatedRoute,
			  navController:ArrowNavigationService,
			  pageService:PageService,
			  backendService:BackendService,
			  loaderService:ArrowLoaderService,
			  alertService:ArrowAlertService,
			  public modalController:ModalController)
	{
		super(route, navController, pageService, backendService, loaderService, alertService);
	}





	ngOnInit()
	{
		super.ngOnInit();


		this.goals = this.page.template.data
			   .map((item) => {

				   let {steps, ...newGoal} = item;
				   newGoal.steps = steps.map((item) => {
					   return {...item};
				   });

				   return newGoal;
			   });


		if (this.goals.length)
		{
			this.selectedGoal = this.goals[0];
		}
	}





	public showModalGoal(goal?:VOGoal):void
	{
		this.modalController
			   .create({
				   component      : AddEditGoalComponent,
				   cssClass       : "goalModal",
				   backdropDismiss: false,
				   componentProps : {
					   'goal': goal
				   }
			   })

			   .then((value) => {

				   value.onWillDismiss()
						 .then((value) => {

							 if (!value.data)
							 {
								 return;
							 }


							 if (goal)
							 {
								 this.editGoal(goal, value.data);
							 }
							 else
							 {
								 this.addGoal(value.data);
							 }
						 });

				   return value.present();
			   });
	}





	public addGoal(goal:VOGoal):void
	{
		goal.id = UUID.UUID();
		goal.steps = [];


		this.goals.push(goal);
	}





	public editGoal(oldValue:VOGoal, newValue:VOGoal):void
	{
		oldValue.name = newValue.name;
		oldValue.description = newValue.description;
	}





	public deleteGoal(id:string, index:number):void
	{
		this.alertService.confirmDelete((yes) => {

			if (!yes)
			{
				return;
			}


			if (this.selectedGoal && this.selectedGoal.id == id)
			{
				this.selectedGoal = null;
			}
			this.goals.splice(index, 1);
		});
	}





	public selectModule(item:VOGoal):void
	{
		if (this.selectedGoal && this.selectedGoal.id == item.id)
		{
			this.selectedGoal = null
		}
		else
		{
			this.selectedGoal = item;
		}
	}





	public showModalStep(step?:Step):void
	{
		this.modalController
			   .create({
				   component      : AddEditStepComponent,
				   backdropDismiss: false,
				   componentProps : {
					   'step': step
				   }
			   })

			   .then((value) => {

				   value.onWillDismiss()
						 .then((value) => {

							 if (!value.data)
							 {
								 return;
							 }


							 if (step)
							 {
								 this.editStep(step, value.data);
							 }
							 else
							 {
								 this.addStep(value.data);
							 }
						 });

				   return value.present();
			   });
	}





	public addStep(step:Step):void
	{
		step.id = UUID.UUID();


		this.selectedGoal.steps.push(step);
	}





	public editStep(oldValue:Step, newValue:Step):void
	{
		oldValue.type = newValue.type;
		oldValue.name = newValue.name;
		oldValue.description = newValue.description;
	}





	public deleteStep(index:number):void
	{
		this.alertService.confirmDelete((yes) => {

			if (!yes)
			{
				return;
			}
			this.selectedGoal.steps.splice(index, 1);
		});
	}





	onNext(submit?:boolean)
	{
		this.page.template.data = this.goals;


		super.onNext(submit);
	}





	public help():void
	{
		let intro = introJs();

		intro.setOptions({
			steps: [
				{
					intro: "This wizard will help you set you Goals."
				},
				{
					element: '#step1',
					intro  : 'Start adding your goals.',
				},
				{
					element: '#step2',
					intro  : "Select your goal from the list.",
				},
				{
					element: '#step3',
					intro  : 'Add your steps to achieve your goal.'
				}
			]
		});

		intro.start();
	}
}
