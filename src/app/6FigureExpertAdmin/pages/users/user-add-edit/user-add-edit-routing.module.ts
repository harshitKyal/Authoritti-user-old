import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserAddEditPage} from './user-add-edit.page';
import {ResolveUserAddEditGuard} from "../../../gaurds/resolve/users/resolve-user-add-edit.guard";


const routes:Routes = [
	{
		path     : '',
		component: UserAddEditPage,
		resolve  : {info: ResolveUserAddEditGuard}
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserAddEditPageRoutingModule
{
}
