import {NgModule} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserAddEditPageRoutingModule} from './user-add-edit-routing.module';

import {UserAddEditPage} from './user-add-edit.page';


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		UserAddEditPageRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [UserAddEditPage],
	providers   : [
		TitleCasePipe
	]
})
export class UserAddEditPageModule
{
}
