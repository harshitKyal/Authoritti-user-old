import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AverageSaleRequiredPage} from './average-sale-required.page';
import {ResolvePageGuard} from "../../../../../../gaurds/resolve/resolve-page.guard";


const routes:Routes = [
	{
		path     : '',
		component: AverageSaleRequiredPage,
		resolve  : {page_info: ResolvePageGuard}
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AverageSaleRequiredPageRoutingModule
{
}
