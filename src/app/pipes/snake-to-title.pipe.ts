import {Pipe, PipeTransform} from '@angular/core';
import {TitleCasePipe} from "@angular/common";


@Pipe({
	name: 'snakeToTitleCase'
})
export class SnakeToTitleCasePipe implements PipeTransform
{
	constructor(private titleCasePipe:TitleCasePipe)
	{
	}





	transform(value:any, args?:any):any
	{
		return (value as string)
			   .split('_')
			   .map((v) => this.titleCasePipe.transform(v))
			   .join(' ');
	}
}
