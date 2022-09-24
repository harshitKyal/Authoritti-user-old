import {EnumField} from "../enums/Enums";


export class VOSlider
{
	public min_value:number;
	public max_value:number;
	public min_value_label:string;
	public max_value_label:string;
	public tags:string[] = [];
	public default_answer:number;
	public answer:number;
	public filter:number;





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.min_value = +init[EnumField.MIN_VALUE];
			this.max_value = +init[EnumField.MAX_VALUE];
			this.min_value_label = init[EnumField.MIN_VALUE_LABEL];
			this.max_value_label = init[EnumField.MAX_VALUE_LABEL];
			this.tags = init[EnumField.TAGS].concat();
			this.default_answer = +init[EnumField.DEFAULT_ANSWER];
			this.filter = +init[EnumField.FILTER];
		}
	}





	public get finalAnswer():number
	{
		return +this.answer;
	}





	public set finalAnswer(value)
	{
		this.answer = isNaN(value) ? this.default_answer : +value;
	}





	public get hasAnswer():boolean
	{
		return !isNaN(this.answer);
	}





	public reset():void
	{
		this.answer = this.default_answer;
	}
}
