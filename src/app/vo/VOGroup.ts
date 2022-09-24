import {VOBase} from "./base/VOBase";
import {EnumField} from "../enums/Enums";


export class VOGroup extends VOBase
{
	public name:string;
	public entityId:string;





	constructor(init?:Partial<any>)
	{
		super(init);


		if (init)
		{
			this.name = init[EnumField.NAME];
			this.entityId = init[EnumField.ENTITY_ID];
		}
	}
}
