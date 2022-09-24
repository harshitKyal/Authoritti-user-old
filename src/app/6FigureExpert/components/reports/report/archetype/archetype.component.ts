import {Component} from '@angular/core';
import {BaseReport} from "../../base/BaseReport";
import {BackendService} from "../../../../../services/backend.service";


@Component({
	selector   : 'comp-archetype',
	templateUrl: './archetype.component.html',
	styleUrls  : ['./archetype.component.scss'],
})
export class ArchetypeComponent extends BaseReport
{
	constructor(backendService:BackendService)
	{
		super(backendService);
	}





	HTML():string
	{
		let html:string = super.HTML();
		let code:string = "";


		html += `
<table style="width:100%">
<tr>
<th style="font-family: Verdana; text-align:center; width: 50%;"><h2>Name</h2></th>
<th style="font-family: Verdana; text-align:center; width: 50%;"><h2>Score</h2></th>
</tr>`;


		for (let itemReport of this.report.items)
		{
			code += `
<tr>
<td style="font-family: Verdana; text-align:center; font-size:14px; padding-top:8px;">${itemReport.key}</td>
<td style="font-family: Verdana; text-align:center; font-size:14px; padding-top:8px;">${itemReport.value}</td>
</tr>`;
		}


		code += `</table>`;
		code += this.getFooter();

		return html + code;
	}
}
