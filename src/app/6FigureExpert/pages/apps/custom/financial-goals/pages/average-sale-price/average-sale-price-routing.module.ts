import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AverageSalePricePage} from './average-sale-price.page';
import {ResolvePageGuard} from "../../../../../../gaurds/resolve/resolve-page.guard";


const routes:Routes = [
	{
		path     : '',
		component: AverageSalePricePage,
		resolve  : {page_info: ResolvePageGuard}
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AverageSalePricePageRoutingModule
{
}
