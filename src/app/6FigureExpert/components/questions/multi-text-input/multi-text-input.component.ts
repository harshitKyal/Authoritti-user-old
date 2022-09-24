import {Component, Input, OnInit} from '@angular/core';
import {VOQuestion} from "../../../../vo/VOQuestion";


@Component({
	selector   : 'comp-multi-text-input',
	templateUrl: './multi-text-input.component.html',
	styleUrls  : ['./multi-text-input.component.scss'],
})
export class MultiTextInputComponent implements OnInit
{
	@Input('data') question:VOQuestion;





	constructor()
	{
	}





	ngOnInit()
	{
	}
}
