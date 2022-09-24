import {EnumApp, EnumField} from "../enums/Enums";
import {VOBase} from "./base/VOBase";


export class VOApp extends VOBase
{
	public entityId:string;
	public name:string;
	public icon:string;
	public url:string;





	constructor(init?:Partial<any>)
	{
		super(init);


		if (init)
		{
			this.entityId = init[EnumField.ENTITY_ID];
			this.name = init[EnumField.NAME];
			this.icon = init[EnumField.ICON];
			this.url = init[EnumField.URL];
		}


		this.type = this.type || EnumApp.DYNAMIC;
	}
}
