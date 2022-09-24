import {ArrowVOUser} from "../Arrow/vo/ArrowVOUser";
import {EnumField} from "../enums/Enums";


export interface UserRole
{
	can_add:boolean;
	can_edit:boolean;
	can_delete:boolean;
	can_reorder:boolean;
}


export class VOUser extends ArrowVOUser
{
	public user_roles:any = {};





	constructor(init?:Partial<any>)
	{
		super(init);


		if (init)
		{
			this.user_roles = init[EnumField.USER_ROLES] || this.user_roles;
		}
	}
}
