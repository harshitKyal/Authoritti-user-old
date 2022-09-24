export class ArrowVOEnvironment
{
	public name:string;
	public key:string;
	public secret:string;
	public credential:string;
	public isLive:boolean;





	constructor(config:
					{
						key:string,
						secret:string,
						name?:string,
						credential?:string,
						isLive?:boolean
					})
	{
		this.key = config.key;
		this.secret = config.secret;
		this.name = config.name;
		this.credential = config.credential;
		this.isLive = config.isLive;
	}
}
