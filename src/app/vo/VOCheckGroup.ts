import {EnumField} from "../enums/Enums";
import {VOQuestion} from "./VOQuestion";


export class VOCheckGroup
{
	public min_value:number;
	public max_value:number;
	public questions:VOQuestion[] = [];





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.min_value = +init[EnumField.MIN_VALUE];
			this.max_value = +init[EnumField.MAX_VALUE];
		}
	}





	public get finalAnswer():any
	{
		let answers = [];


		for (let itemQuestion of this.questions)
		{
			answers.push(itemQuestion.check.finalAnswer);
		}


		return Object.assign({}, ...answers);
	}





	public set finalAnswer(value)
	{
		for (let itemQuestion of this.questions)
		{
			itemQuestion.check.finalAnswer = value;
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
		for (let itemQuestion of this.questions)
		{
			itemQuestion.reset();
		}
	}
}
