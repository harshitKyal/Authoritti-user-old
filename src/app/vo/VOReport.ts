import {VOBase} from "./base/VOBase";
import {EnumField} from "../enums/Enums";


interface Formula
{
	code:string;
	description:string;
}


export interface ReportItem
{
	key:string;
	value:any;
	type?:string | number;
}


export class VOReport extends VOBase
{
	public formula:Formula;
	public items:ReportItem[];





	constructor(init?:Partial<any>)
	{
		super(init);


		if (init)
		{
			this.formula = init[EnumField.FORMULA];
		}
	}
}
