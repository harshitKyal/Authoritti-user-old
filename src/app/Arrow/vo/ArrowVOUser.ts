export class ArrowVOUser
{
	public username:string;
	public password:string;
	public userId:string;
	public entityId:string;
	public thumbnail:string;
	public name:string;
	public email:string;
	public role:string;
	public active:boolean;





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.username = init.email;
			this.userId = init.userId;
			this.entityId = init.entityId;
			this.name = init.name;
			this.email = init.email;
			this.role = init.role;
			this.active = init.active;
		}
	}
}
