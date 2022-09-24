import {EnumField} from "../enums/Enums";
import {VORadio} from "./VORadio";


interface TableYesNo
{
	auid:string,
	name:string;
	score:number;
	scoreName:string;
	radio?:VORadio;
}


export class VOTableYesNo
{
	public yes_label:string;
	public no_label:string
	public rows:TableYesNo[] = [];





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.yes_label = init[EnumField.YES_LABEL] || "Yes";
			this.no_label = init[EnumField.NO_LABEL] || "No";
		}
	}





	public get finalAnswer():any
	{
		return this.rows
			   .filter((item) => item.radio.hasAnswer)

			   .reduce((acc, item) => {
				   acc[item.auid] = item.radio.finalAnswer;
				   return acc;
			   }, {});
	}





	public set finalAnswer(value)
	{
		for (let itemRow of this.rows)
		{
			itemRow.radio.finalAnswer = value && value[itemRow.auid];
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
			row.radio.reset();
		}
	}
}
