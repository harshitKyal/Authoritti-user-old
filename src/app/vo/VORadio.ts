import {EnumField} from "../enums/Enums";


export class VORadio
{
	public options:Array<{ auid:string, name:string }> = [];
	public answers:any = {};
	public has_other:boolean;





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.options = init[EnumField.OPTIONS].concat();
			this.has_other = init[EnumField.HAS_OTHER];
		}
	}





	public get finalAnswer():any
	{
		if (this.answers[EnumField.OTHER])
		{
			this.answers[EnumField.OTHER] = this.answers[EnumField.OTHER].trim();
		}


		return this.answers[EnumField.AUID] ? this.answers : {};
	}





	public set finalAnswer(value)
	{
		let key:string = value && value[EnumField.AUID];


		this.answers = !!this.options.find((item) => item.auid == key)
			   ? {...value} : {};
	}





	public get hasAnswer():boolean
	{
		let answers:any = this.finalAnswer;


		if (!answers[EnumField.AUID])
		{
			return false;
		}
		else if (answers[EnumField.AUID] != EnumField.OTHER)
		{
			let key:string = answers[EnumField.AUID];

			return !!this.options.find((item) => item.auid == key);
		}
		else
		{
			return true;
		}
	}





	public reset():void
	{
		this.answers[EnumField.AUID] = null;
		this.answers[EnumField.OTHER] = null;
	}
}
