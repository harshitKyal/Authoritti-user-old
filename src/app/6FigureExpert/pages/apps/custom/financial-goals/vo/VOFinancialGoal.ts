import {EnumField} from "../../../../../../enums/Enums";


export class VOFinancialGoal
{
	public annual_goal:number;
	public products:any = {};
	public tasks:any = {};





	constructor(init?:Partial<any>)
	{
		if (init)
		{
		}
	}





	public get TotalSales():number
	{
		let total:number = 0;


		for (let itemProduct of Object.values(this.products))
		{
			total += itemProduct['saleValue'];
		}

		return total;
	}





	public get finalAnswer():any
	{
		let answer:any = {};
		answer[EnumField.ANNUAL_GOAL] = +this.annual_goal;
		answer[EnumField.PRODUCTS] = this.products;
		answer[EnumField.TASKS] = Object.entries(this.tasks)
			   .filter(([key, checked]) => checked)
			   .reduce((acc, [key, value]) => {

				   acc[key] = value;
				   return acc;
			   }, {});


		return answer;
	}
}
