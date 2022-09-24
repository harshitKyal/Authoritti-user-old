import {Component} from '@angular/core';
import {BaseReport} from "../../base/BaseReport";
import {BackendService} from "../../../../../services/backend.service";


@Component({
	selector   : 'comp-financial-goal',
	templateUrl: './financial-goal.component.html',
	styleUrls  : ['./financial-goal.component.scss'],
})
export class FinancialGoalComponent extends BaseReport
{
	constructor(backendService:BackendService)
	{
		super(backendService);
	}





	HTML():string
	{
		let html:string = super.HTML();
		let code:string = "";


		for (let itemReport of this.report.items)
		{
			code += `<table style="width:100%;">
                      <caption style="font-family: Verdana; padding:16px; font-size:22px; display: block;">${itemReport.key}</caption>
                      <tr>
                        <th style="font-family: Verdana; text-align:center; font-size:14px; padding-bottom:9px;">Product/Service</th>
                        <th style="font-family: Verdana; text-align:center; font-size:14px; padding-bottom:9px;">Dollar Value</th>
                        <th style="font-family: Verdana; text-align:center; font-size:14px; padding-bottom:9px;">Total Sales</th>
                        <th style="font-family: Verdana; text-align:center; font-size:14px; padding-bottom:9px;">Generated Sales</th>
                        <th style="font-family: Verdana; text-align:center; font-size:14px; padding-bottom:9px;">Close Rate</th>
                        <th style="font-family: Verdana; text-align:center; font-size:14px; padding-bottom:9px;">Sales Required</th>
                        <th style="font-family: Verdana; text-align:center; font-size:14px; padding-bottom:9px; padding-left:9px;">Leads Required</th>
                      </tr>`;


			for (let itemValue of itemReport.value)
			{
				code += `<tr>
                          <td style="font-family: Verdana; text-align:center; font-size:14px;">${itemValue.name}</td>
                          <td style="font-family: Verdana; text-align:center; font-size:14px;">${itemValue.dollarValue}</td>
                          <td style="font-family: Verdana; text-align:center; font-size:14px;">${itemValue.saleValue}</td>
                          <td style="font-family: Verdana; text-align:center; font-size:14px;">${itemValue.generatedSales}</td>
                          <td style="font-family: Verdana; text-align:center; font-size:14px;">${itemValue.closeRate}</td>
                          <td style="font-family: Verdana; text-align:center; font-size:14px;">${itemValue.salesRequired}</td>
                          <td style="font-family: Verdana; text-align:center; font-size:14px;">${itemValue.leadsRequired}</td>
                        </tr>`;
			}

			code += `</table><br>`;
		}


		code += this.getFooter();


		return html + code;
	}
}
