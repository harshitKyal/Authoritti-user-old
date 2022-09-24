import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TasksPage} from './tasks.page';
import {ResolvePageGuard} from "../../../../../../gaurds/resolve/resolve-page.guard";


const routes:Routes = [
	{
		path     : '',
		component: TasksPage,
		resolve  : {page_info: ResolvePageGuard}
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TasksPageRoutingModule
{
}
