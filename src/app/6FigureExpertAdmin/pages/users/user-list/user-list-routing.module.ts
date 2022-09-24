import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserListPage} from './user-list.page';
import {ResolveUserListGuard} from "../../../gaurds/resolve/users/resolve-user-list.guard";


const routes:Routes = [
	{
		path     : '',
		component: UserListPage,
		resolve  : {users: ResolveUserListGuard}
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserListPageRoutingModule
{
}
