import {Component, Input, OnInit} from '@angular/core';
import {VOQuestion} from "../../../../vo/VOQuestion";


@Component({
	selector   : 'comp-text-input',
	templateUrl: './text-input.component.html',
	styleUrls  : ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit
{
	@Input('data') question:VOQuestion;





	constructor()
	{
	}





	ngOnInit()
	{
	}
}
