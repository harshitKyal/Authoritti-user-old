import {EnumField} from "../../enums/Enums";


export class VOBase
{
	public auid:string;
	public title:string;
	public type:string;
	public description:string;
	public active:boolean;





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.auid = init[EnumField.AUID];
			this.title = init[EnumField.TITLE];
			this.type = init[EnumField.TYPE];
			this.description = init[EnumField.DESCRIPTION];
			this.active = init[EnumField.ACTIVE];
		}
	}
}
