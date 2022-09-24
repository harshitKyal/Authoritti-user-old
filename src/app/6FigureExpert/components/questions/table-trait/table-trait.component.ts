import {Component, Input, OnInit} from '@angular/core';
import {Base} from "../../../../base/Base";
import {VOQuestion} from "../../../../vo/VOQuestion";


@Component({
	selector   : 'comp-table-trait',
	templateUrl: './table-trait.component.html',
	styleUrls  : ['./table-trait.component.scss'],
})
export class TableTraitComponent extends Base implements OnInit
{
	private _question:VOQuestion;

	public option5:any = [];
	public option2:any = [];





	@Input('data')
	set question(value:VOQuestion)
	{
		this._question = value;


		this.option5 = value.table_trait.options.slice(0, 5);
		this.option2 = value.table_trait.options.slice(5, 7);
	}
	get question():VOQuestion
	{
		return this._question;
	}





	constructor()
	{
		super();
	}





	ngOnInit()
	{
	}





	public onChange(checked:any, id:string, row:any, field:string):void
	{
		if (!checked && row[field] != id)
		{
			return;
		}


		if (checked)
		{
			row[field] = id;
		}
		else
		{
			row[field] = null;
		}
	}
}
