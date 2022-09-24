import {EnumField} from "../enums/Enums";


export class DataManager
{
	private static _instance:DataManager;





	private constructor()
	{
	}





	public static get instance():DataManager
	{
		if (!DataManager._instance)
		{
			DataManager._instance = new DataManager();
		}


		return DataManager._instance;
	}





	//--------------------------------------------------------------------------
	//
	// Data
	//
	//--------------------------------------------------------------------------
	public onTrackByIndex(index, item)
	{
		return index;
	}





	public onTrackById(index, item)
	{
		return item[EnumField.AUID];
	}





	public onTrackByIdd(index, item)
	{
		return item[EnumField.ID];
	}





	public onTrackByEntityId(index, item)
	{
		return item[EnumField.ENTITY_ID];
	}





	public getCopyRightData():string
	{
		let d = new Date();

		// return `${d.getMonth()/d.getMonth()/d.getMonth()}`;
		return new Date().getFullYear().toString();
	}





	public numberWithCommas(value:number, fixed?:number):string
	{
		let parts = value.toFixed(fixed).split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	}





	public isLeapYear(year:number):boolean
	{
		return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
	}





	public daysInMonth(month:number, year:number):number
	{
		return (month === 4 || month === 6 || month === 9 || month === 11)
			   ? 30
			   : (month === 2)
					 ? this.isLeapYear(year)
						    ? 29 : 28
					 : 31;
	}





	public checkUserRules(rules:any):boolean
	{
		let apps = Object.keys(rules);
		if (apps.length)
		{
			for (let id of apps)
			{
				let atLeastOne = Object.values(rules[id])
					   .filter((checked) => checked);


				if (atLeastOne.length)
				{
					return true;
				}
			}
		}


		return false;
	}
}
