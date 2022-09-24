import {Component} from '@angular/core';
import {BaseReport} from "../../base/BaseReport";
import {BackendService} from "../../../../../services/backend.service";
import {EnumDynamicQuestion, EnumQuestion, EnumType} from "../../../../../enums/Enums";


@Component({
	selector   : 'comp-simple',
	templateUrl: './simple.component.html',
	styleUrls  : ['./simple.component.scss'],
})
export class SimpleComponent extends BaseReport
{
	constructor(backendService:BackendService)
	{
		super(backendService);
	}





	HTML():string
	{
		let html:string = super.HTML();
		let code:string = "";


		code += `<table style="width:100%">`;


		for (let itemReport of this.report.items)
		{
			switch (itemReport.type)
			{
				   // category
				case EnumType.Category:
				{
					code += `
<tr>
<td style="font-family: Verdana; text-align: center; font-size:14px; padding-top:8px; width: 50%;">${itemReport.key}</td>
<td style="font-family: Verdana; text-align: center; font-size:14px; padding-top:8px; width: 50%;">${itemReport.value}</td>
</tr>
`;
					break;
				}


				   // group
				case EnumType.Group:
				{
					code += `</table><table style="width:100%">`;
					code += `<tr><td colspan="3" style="font-family: Verdana; text-align: center"><h2 style="margin: 16px 0 0">${itemReport.key}</h2></td></tr>`;
					code += `<tr><td><div style="height: 24px"></div></td></tr>`;
					break;
				}


				   // slider
				case EnumQuestion.SLIDER:
				{
					for (let i:number = 0; i < itemReport.value.length; ++i)
					{
						// start
						if (i % 3 == 0)
						{
							code += "<tr>";
						}


						let item = itemReport.value[i];
						code += `<td style="font-family: Verdana; text-align:center; font-size:14px; padding-top:8px; width: 33%">${item.key} = ${item.value}</td>`;


						// end
						if (i % 3 == 2 || i == itemReport.value.length - 1)
						{
							code += "</tr>";
						}
					}
					code += `<tr><td><div style="height: 24px"></div></td></tr>`;
					break;
				}


				   // slider, textInput, radio, textArea
				case EnumQuestion.TEXT_INPUT:
				case EnumQuestion.SINGLE_CHOICE:
				case EnumQuestion.TEXT_AREA:
				{
					code += `<tr><td colspan="3" style="font-family: Verdana;"><h4 style="margin: 0">Q: ${itemReport.key}</h4></td></tr>`;
					code += `<tr><td colspan="3" style="font-family: Verdana; font-size:14px; padding-left: 28px;">${itemReport.value}</td></tr>`;
					code += `<tr><td><div style="height: 24px"></div></td></tr>`;
					break;
				}


				   // check
				case EnumQuestion.MULTI_CHOICE:
				{
					code += `<tr><td colspan="3" style="font-family: Verdana;"><h4 style="margin: 0;">Q: ${itemReport.key}</h4></td></tr>`;
					for (let i:number = 0; i < itemReport.value.length; ++i)
					{
						// start
						if (i % 3 == 0)
						{
							code += "<tr>";
						}


						let item = itemReport.value[i];
						code += `<td style="font-family: Verdana; text-align:center; font-size:14px; padding-top:8px; width: 33%">${item}</td>`;


						// end
						if (i % 3 == 2 || i == itemReport.value.length - 1)
						{
							code += "</tr>";
						}
					}
					code += `<tr><td><div style="height: 24px"></div></td></tr>`;
					break;
				}


				   // multiTextInput
				case EnumQuestion.MULTI_TEXT_INPUT:
				{
					code += `<tr><td colspan="3" style="font-family: Verdana;"><h4 style="margin: 0">Q: ${itemReport.key}</h4></td></tr>`;
					for (let item of itemReport.value)
					{
						if (item.key)
						{
							code += `<tr><td colspan="3" style="font-family: Verdana; font-size:16px;"><h4 style="margin: 0">${item.key}</h4></td></tr>`;
						}
						code += `<tr><td colspan="3" style="font-family: Verdana; font-size:14px; padding: 0 0 16px 28px">${item.value}</td></tr>`;
					}
					code += `<tr><td><div style="height: 24px"></div></td></tr>`;
					break;
				}


				   // tableYesNO
				case EnumDynamicQuestion.TABLE_YES_NO:
				{
					code += `</table><table style="width:100%">`;
					code += `<tr>`;
					for (let i:number = 0; i < itemReport.key.length; ++i)
					{
						code += `<td style="font-family: Verdana; width: 25%"><h4 style="margin: 0 0 16px; text-align: center">${itemReport.key[i]}</h4></td>`;
					}
					code += "</tr>";


					for (let i:number = 0; i < itemReport.value.length; ++i)
					{
						code += "<tr>";

						let item = itemReport.value[i];
						code += `<td style="font-family: Verdana; width: 25%; text-align:center; font-size:14px; padding-top:8px;">${item[0]}</td>`;
						code += `<td style="font-family: Verdana; width: 25%; text-align:center; font-size:14px; padding-top:8px;">${item[1]}</td>`;
						code += `<td style="font-family: Verdana; width: 25%; text-align:center; font-size:14px; padding-top:8px;">${item[2]}</td>`;
						code += `<td style="font-family: Verdana; width: 25%; text-align:center; font-size:14px; padding-top:8px;">${item[3]}</td>`;

						code += "</tr>";
					}
					code += `<tr><td><div style="height: 24px"></div></td></tr>`;
					break;
				}


				   // tableDropDown
				case EnumDynamicQuestion.TABLE_DROP_DOWN:
				{
					code += `</table><table style="width:100%">`;
					code += `<tr>`;
					for (let i:number = 0; i < itemReport.key.length; ++i)
					{
						code += `<td style="font-family: Verdana; width: 33%"><h4 style="margin: 0 0 16px; text-align: center">${itemReport.key[i]}</h4></td>`;
					}
					code += "</tr>";


					for (let i:number = 0; i < itemReport.value.length; ++i)
					{
						code += "<tr>";

						let item = itemReport.value[i];
						code += `<td style="font-family: Verdana; width: 33%; text-align:center; font-size:14px; padding-top:8px;">${item[0]}</td>`;
						code += `<td style="font-family: Verdana; width: 33%; text-align:center; font-size:14px; padding-top:8px;">${item[1]}</td>`;
						code += `<td style="font-family: Verdana; width: 33%; text-align:center; font-size:14px; padding-top:8px;">${item[2]}</td>`;

						code += "</tr>";
					}
					code += `<tr><td><div style="height: 24px"></div></td></tr>`;
					break;
				}


				   // checkGroup
				case EnumDynamicQuestion.MULTI_CHOICE_GROUP:
				{
					code += `</table><table style="width:100%">`;

					for (let i:number = 0; i < itemReport.value.length; ++i)
					{
						let itemValue = itemReport.value[i];


						code += `<tr><td colspan="3" style="font-family: Verdana;"><h4 style="margin: 0;">Q: ${itemValue.key}</h4></td></tr>`;
						for (let i:number = 0; i < itemValue.value.length; ++i)
						{
							// start
							if (i % 3 == 0)
							{
								code += "<tr>";
							}


							let item = itemValue.value[i];
							code += `<td style="font-family: Verdana; text-align:center; font-size:14px; padding-top:8px; width: 33%">${item}</td>`;


							// end
							if (i % 3 == 2 || i == itemValue.value.length - 1)
							{
								code += "</tr>";
							}
						}
						code += `<tr><td><div style="height: 24px"></div></td></tr>`;
					}
					break;
				}
			}
		}


		code += `</table>`;
		code += this.getFooter();


		return html + code;
	}
}
