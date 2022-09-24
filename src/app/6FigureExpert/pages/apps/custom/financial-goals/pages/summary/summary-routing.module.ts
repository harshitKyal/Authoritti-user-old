import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SummaryPage} from './summary.page';
import {ResolvePageGuard} from "../../../../../../gaurds/resolve/resolve-page.guard";


const routes:Routes = [
	{
		path     : '',
		component: SummaryPage,
		resolve  : {page_info: ResolvePageGuard}
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SummaryPageRoutingModule
{
}
