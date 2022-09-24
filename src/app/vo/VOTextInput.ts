import {EnumField} from "../enums/Enums";


export class VOTextInput
{
	public placeholder:string;
	public answer:string;





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.placeholder = init[EnumField.PLACEHOLDER];
		}
	}





	public get finalAnswer():string
	{
		if (!this.answer)
		{
			return null;
		}


		return this.answer.trim() || null;
	}





	public set finalAnswer(value)
	{
		this.answer = value;
	}





	public get hasAnswer():boolean
	{
		return !!this.finalAnswer;
	}





	public reset():void
	{
		this.answer = null;
	}
}
