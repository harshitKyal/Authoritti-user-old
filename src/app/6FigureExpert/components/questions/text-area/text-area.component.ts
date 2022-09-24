import {Component, Input, OnInit} from '@angular/core';
import {VOQuestion} from "../../../../vo/VOQuestion";


@Component({
	selector   : 'comp-text-area',
	templateUrl: './text-area.component.html',
	styleUrls  : ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit
{
	@Input('data') question:VOQuestion;





	constructor()
	{
	}





	ngOnInit()
	{
	}
}
