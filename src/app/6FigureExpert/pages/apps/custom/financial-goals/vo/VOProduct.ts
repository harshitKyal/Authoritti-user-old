import {EnumCloseRate} from "../../../../../../enums/Enums";


export class VOProduct
{
	public name:string;
	public dollarValue:number;
	public saleValue:number;
	public closeRate:string;





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.name = init.name;
			this.dollarValue = +init.dollarValue;
			this.saleValue = +init.saleValue;
			this.closeRate = init.closeRate;
		}
	}





	public generatedSales(annualGoal:number):number
	{
		let c3:number = annualGoal;
		let b13:number = this.dollarValue;
		let c7:number = this.saleValue / 100;

		return c3 / b13 * c7 * b13;
	}





	public salesInUnits(annualGoal:number):number
	{
		let c3:number = annualGoal;
		let b13:number = this.dollarValue;
		let c7:number = this.saleValue / 100;

		return c3 / b13 * c7;
	}





	public leadsRequired(annualGoal:number):number
	{
		let c20:number = this.salesInUnits(annualGoal);
		let closeRate:number = EnumCloseRate.find((item) => item.id == this.closeRate).value;
		let leadBy:number = 100 / closeRate;

		return c20 * leadBy;
	}
}
