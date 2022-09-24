import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AnnualGoalPage} from './annual-goal.page';
import {ResolvePageGuard} from "../../../../../../gaurds/resolve/resolve-page.guard";


const routes:Routes = [
	{
		path     : '',
		component: AnnualGoalPage,
		resolve  : {page_info: ResolvePageGuard}
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnnualGoalPageRoutingModule
{
}
