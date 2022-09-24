export class ArrowUtils
{
	public static getRoot(url:string):string
	{
		const urls = url.split('/');
		console.log(urls);


		return `/${urls[1]}`;
	}





	public static getUrl(url:string, removeCount?:number):string
	{
		const parts = url.split('?')[0];
		console.log(parts);


		const urls = parts.split('/');
		console.log(urls);


		for (let i:number = 0; i < removeCount; ++i)
		{
			urls.pop();
		}


		const newUrl = urls.length > 1 ? urls.join('/') : '/';
		console.log({newUrl});


		return newUrl;
	}
}
