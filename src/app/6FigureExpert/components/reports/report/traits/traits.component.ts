import {Component} from '@angular/core';
import {BaseReport} from "../../base/BaseReport";
import {BackendService} from "../../../../../services/backend.service";


@Component({
	selector   : 'comp-traits',
	templateUrl: './traits.component.html',
	styleUrls  : ['./traits.component.scss'],
})
export class TraitsComponent extends BaseReport
{
	constructor(backendService:BackendService)
	{
		super(backendService);
	}





	HTML():string
	{
		let html:string = super.HTML();
		let code:string = "";


		html += `<table style="width:100%">`;


		for (let itemReport of this.report.items)
		{
			code += `
<tr>
<td colspan="3" style="font-family: Verdana; text-align: center;"><h2 style="margin: 16px 0 0">${itemReport.key}</h2></td>
</tr>`;

			for (let itemQuestionnaire of itemReport.value)
			{
				code += `
<tr>
<td colspan="3" style="font-family: Verdana;"><h4 style="margin: 0">${itemQuestionnaire.key}</h4></td>
</tr>`;

				for (let i:number = 0; i < itemQuestionnaire.value.length; ++i)
				{
					// start
					if (i % 3 == 0)
					{
						code += "<tr>";
					}


					let item = itemQuestionnaire.value[i];
					code += `<td style="font-family: Verdana; text-align:center; font-size:14px; padding-top:8px; width: 33%">${item.key} = ${item.value}</td>`;


					// end
					if (i % 3 == 2 || i == itemQuestionnaire.value.length - 1)
					{
						code += "</tr>";
					}
				}


				code += `<tr><td><div style="height: 16px"></div></td></tr>`;
			}
		}


		code += `</table>`;
		code += this.getFooter();


		return html + code;
	}
}
