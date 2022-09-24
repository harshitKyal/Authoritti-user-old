import {VOBase} from "./base/VOBase";
import {EnumField} from "../enums/Enums";


export class VOTemplate extends VOBase
{
	public data:any;





	constructor(init?:Partial<any>)
	{
		super(init);


		if (init)
		{
			this.data = init[EnumField.DATA];
		}
	}
}
