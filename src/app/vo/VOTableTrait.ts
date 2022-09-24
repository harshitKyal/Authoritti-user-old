import {EnumField} from "../enums/Enums";


interface TableTrait
{
	auid:string,
	name:string;
	value:number;
	answer?:string;
	answerPositive?:string;
}


export class VOTableTrait
{
	public id:string;
	public columns:Array<{ auid:string, name:string }> = [];
	public options:Array<{ auid:string, name:string }> = [];
	public rows:TableTrait[] = [];





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.id = init[EnumField.ID];
			this.columns = init[EnumField.COLUMNS].concat();
			this.options = init[EnumField.OPTIONS].concat();
		}
	}





	public get finalAnswer():any
	{
		return this.rows
			   .filter((item) => item.answer)

			   .reduce((acc, item) => {
				   acc[item.auid] = {
					   answer        : item.answer,
					   answerPositive: item.answerPositive,
				   };
				   return acc;
			   }, {});
	}





	public set finalAnswer(value)
	{
		for (let itemRow of this.rows)
		{
			let obj = value && value[itemRow.auid];


			itemRow.answer = obj && obj.answer;
			itemRow.answerPositive = obj && obj.answerPositive;
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
			row.answerPositive = null;
		}
	}
}
