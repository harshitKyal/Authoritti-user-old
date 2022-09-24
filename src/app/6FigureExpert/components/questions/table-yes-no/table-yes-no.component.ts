import {Component, Input, OnInit} from '@angular/core';
import {VOQuestion} from "../../../../vo/VOQuestion";
import {Base} from "../../../../base/Base";
import {EnumField} from "../../../../enums/Enums";


@Component({
	selector   : 'comp-table-yes-no',
	templateUrl: './table-yes-no.component.html',
	styleUrls  : ['./table-yes-no.component.scss'],
})
export class TableYesNoComponent extends Base implements OnInit
{
	@Input('data') question:VOQuestion;





	constructor()
	{
		super();
	}





	ngOnInit()
	{
	}





	public onChange(id:string, rowIndex:number):void
	{
		this.question.table_yes_no.rows[rowIndex].radio.answers[EnumField.AUID] = id;


		if (id != EnumField.OTHER)
		{
			this.question.table_yes_no.rows[rowIndex].radio.answers[EnumField.OTHER] = null;
		}
	}
}
