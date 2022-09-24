import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {IntroPage} from './intro.page';
import {ComponentsModule} from "../../../components/components.module";
import {ResolvePageGuard} from "../../../gaurds/resolve/resolve-page.guard";


const routes:Routes = [
	{
		path     : '',
		component: IntroPage,
		resolve  : {page_info: ResolvePageGuard}
	}
];


@NgModule({
	imports     : [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ComponentsModule,
	],
	declarations: [IntroPage]
})
export class IntroPageModule
{
}
