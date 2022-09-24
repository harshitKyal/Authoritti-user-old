import {EnumField} from "../enums/Enums";


export interface TableDropDown
{
	auid:string,
	name:string;
	value:number;
	answer?:string;
}


export class VOTableDropDown
{
	public columns:string[] = ["", "", "",];
	public options:Array<{ auid:string, name:string }> = [];
	public rows:TableDropDown[] = [];





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.columns = init[EnumField.COLUMNS].concat();
			this.options = init[EnumField.OPTIONS].concat();
		}
	}





	public get finalAnswer():any
	{
		return this.rows
			   .filter((item) => item.answer)

			   .reduce((acc, item) => {
				   acc[item.auid] = item.answer;
				   return acc;
			   }, {});
	}





	public set finalAnswer(value)
	{
		for (let itemRow of this.rows)
		{
			itemRow.answer = value && value[itemRow.auid];
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
		for (let row of this.rows)
		{
			row.answer = null;
		}
	}
}
