import {Component, Input, OnInit} from '@angular/core';
import {Base} from "../../../../base/Base";
import {VOQuestion} from "../../../../vo/VOQuestion";


@Component({
	selector   : 'comp-table-skill',
	templateUrl: './table-skill.component.html',
	styleUrls  : ['./table-skill.component.scss'],
})
export class TableSkillComponent extends Base implements OnInit
{
	@Input('data') question:VOQuestion;





	constructor()
	{
		super();
	}





	ngOnInit()
	{
	}
}
