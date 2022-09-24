import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AverageSaleRequiredPageRoutingModule} from './average-sale-required-routing.module';

import {AverageSaleRequiredPage} from './average-sale-required.page';
import {ComponentsModule} from "../../../../../../components/components.module";


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		AverageSaleRequiredPageRoutingModule,
		ComponentsModule
	],
	declarations: [AverageSaleRequiredPage]
})
export class AverageSaleRequiredPageModule
{
}
