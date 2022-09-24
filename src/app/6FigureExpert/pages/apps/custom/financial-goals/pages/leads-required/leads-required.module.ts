import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LeadsRequiredPageRoutingModule} from './leads-required-routing.module';

import {LeadsRequiredPage} from './leads-required.page';
import {ComponentsModule} from "../../../../../../components/components.module";


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		LeadsRequiredPageRoutingModule,
		ComponentsModule
	],
	declarations: [LeadsRequiredPage]
})
export class LeadsRequiredPageModule
{
}
