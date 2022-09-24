export class VOPassion
{
	public id:string;
	public count:string;
	public name:string;
	public description:string;
	public year:string;





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.id = init.id;
			this.count = init.count;
			this.name = init.name;
			this.description = init.description;
			this.year = init.year;
		}
	}
}
