import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AnnualGoalPageRoutingModule} from './annual-goal-routing.module';

import {AnnualGoalPage} from './annual-goal.page';
import {ComponentsModule} from "../../../../../../components/components.module";


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		AnnualGoalPageRoutingModule,
		ComponentsModule
	],
	declarations: [AnnualGoalPage]
})
export class AnnualGoalPageModule
{
}
