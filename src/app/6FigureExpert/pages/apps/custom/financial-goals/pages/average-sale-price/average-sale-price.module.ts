import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AverageSalePricePage} from './average-sale-price.page';

import {ComponentsModule} from "../../../../../../components/components.module";
import {AverageSalePricePageRoutingModule} from "./average-sale-price-routing.module";


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		AverageSalePricePageRoutingModule,
		ComponentsModule,
		ReactiveFormsModule
	],
	declarations: [AverageSalePricePage]
})
export class AverageSalePricePageModule
{
}
