import {EnumField} from "../enums/Enums";
import {VOTextInput} from "./VOTextInput";


export class VOMultiTextInput
{
	public inputs:Array<{ auid:string, input:VOTextInput }> = [];





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.inputs = init[EnumField.INPUTS].map((item) => {

				return {
					auid : item[EnumField.AUID],
					input: new VOTextInput(item[EnumField.INPUT])
				};
			});
		}
	}





	public get finalAnswer():any
	{
		return this.inputs
			   .filter((item) => item.input.hasAnswer)

			   .reduce((acc, item) => {
				   acc[item.auid] = item.input.finalAnswer;
				   return acc;
			   }, {});
	}





	public set finalAnswer(value)
	{
		for (let itemInput of this.inputs)
		{
			itemInput.input.finalAnswer = value && value[itemInput.auid];
		}
	}





	public get hasAnswer():boolean
	{
		let answers:any = this.finalAnswer;
		let keys:string[] = Object.keys(answers);

		return keys.length > 0;
	}





	public reset():void
	{
		for (let multi of this.inputs)
		{
			multi.input.reset();
		}
	}
}
