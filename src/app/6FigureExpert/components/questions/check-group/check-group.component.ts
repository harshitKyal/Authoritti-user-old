import {Component, Input, OnInit} from '@angular/core';
import {VOQuestion} from "../../../../vo/VOQuestion";


@Component({
	selector   : 'comp-check-group',
	templateUrl: './check-group.component.html',
	styleUrls  : ['./check-group.component.scss'],
})
export class CheckGroupComponent implements OnInit
{
	@Input('data') question:VOQuestion;





	constructor()
	{
	}





	ngOnInit()
	{
	}
}
