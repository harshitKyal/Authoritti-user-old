export interface Step
{
	id:string;
	name:string;
	description:string;
	type:string;
}


export class VOGoal
{
	public id:string;
	public name:string;
	public description:string;
	public steps:Step[] = [];
}
