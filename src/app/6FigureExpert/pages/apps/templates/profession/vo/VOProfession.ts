export class VOProfession
{
	public id:string;
	public count:string;
	public year:string;
	public company:string;
	public job:string;
	public duration:string;





	constructor(init?:Partial<any>)
	{
		if (init)
		{
			this.id = init.id;
			this.count = init.count;
			this.year = init.year;
			this.company = init.company;
			this.job = init.job;
			this.duration = init.duration;
		}
	}
}
