import {EnumField} from "../enums/Enums";
import {VOBase} from "./base/VOBase";


export class VOSession extends VOBase
{
	public entityId:string;
	public created_at:string;
	public updated_at:string;
	public answers:any = {};





	constructor(init?:Partial<any>)
	{
		super(init);


		if (init)
		{
			this.entityId = init[EnumField.ENTITY_ID];
			this.created_at = init[EnumField.CREATED_AT];
			this.updated_at = init[EnumField.UPDATED_AT];
			this.answers = init[EnumField.ANSWERS] || this.answers;
		}
	}
}
