import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ArrowSplashPage} from './arrow-splash.page';


const routes:Routes = [
	{
		path     : '',
		component: ArrowSplashPage
	}
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [ArrowSplashPage]
})
export class ArrowSplashPageModule
{
}
