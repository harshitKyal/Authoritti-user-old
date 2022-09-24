export class VOError
{
	public code:string;
	public status:string;
	public msg:string;





	constructor(init:any)
	{
		this.code = init['reason_code'];
		this.status = init['status'];
		this.msg = init['status_message'];
	}
}
