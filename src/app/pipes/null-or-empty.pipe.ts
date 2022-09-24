import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
	name: 'nullOrEmpty'
})
export class NullOrEmptyPipe implements PipeTransform
{
	transform(value:any, ...args:any[]):any
	{
		return !value || !value.trim().length;
	}
}
