import {Component, Input, OnInit} from '@angular/core';
import {Base} from "../../../../base/Base";
import {VOQuestion} from "../../../../vo/VOQuestion";
import {EnumField} from "../../../../enums/Enums";


@Component({
	selector   : 'comp-radio',
	templateUrl: './radio.component.html',
	styleUrls  : ['./radio.component.scss'],
})
export class RadioComponent extends Base implements OnInit
{
	@Input('data') question:VOQuestion;





	constructor()
	{
		super();
	}





	ngOnInit()
	{
	}





	public onChange(id:string):void
	{
		this.question.radio.answers[EnumField.AUID] = id;


		if (id != EnumField.OTHER)
		{
			this.question.radio.answers[EnumField.OTHER] = null;
		}
	}
}
