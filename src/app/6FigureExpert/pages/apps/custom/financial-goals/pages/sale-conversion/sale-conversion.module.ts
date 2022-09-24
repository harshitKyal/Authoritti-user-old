import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SaleConversionPageRoutingModule} from './sale-conversion-routing.module';

import {SaleConversionPage} from './sale-conversion.page';
import {ComponentsModule} from "../../../../../../components/components.module";


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		SaleConversionPageRoutingModule,
		ComponentsModule
	],
	declarations: [SaleConversionPage]
})
export class SaleConversionPageModule
{
}
