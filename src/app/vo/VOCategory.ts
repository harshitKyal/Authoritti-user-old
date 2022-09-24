import {VOBase} from "./base/VOBase";
import {EnumField} from "../enums/Enums";


export class VOCategory extends VOBase
{
	public entityId:string;





	constructor(init?:Partial<any>)
	{
		super(init);


		if (init)
		{
			this.entityId = init[EnumField.ENTITY_ID];
		}
	}
}
