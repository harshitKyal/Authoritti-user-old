import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ArrowLoginPage} from './arrow-login.page';


const routes:Routes = [
	{
		path     : '',
		component: ArrowLoginPage
	}
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [ArrowLoginPage]
})
export class ArrowLoginPageModule
{
}
