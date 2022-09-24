import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseReport} from "../../base/BaseReport";
import {BackendService} from "../../../../../services/backend.service";
import {Platform} from "@ionic/angular";
import {EnumReport} from "../../../../../enums/Enums";
import {untilDestroyed} from "ngx-take-until-destroy";


@Component({
	selector   : 'comp-egotistic',
	templateUrl: './egotistic.component.html',
	styleUrls  : ['./egotistic.component.scss'],
})
export class EgotisticComponent extends BaseReport implements OnInit, OnDestroy
{
	public df:number;
	public sm:number;
	public md:number;
	public lg:number;
	public xl:number;
	public mobile:boolean;





	constructor(backendService:BackendService,
			  public platform:Platform)
	{
		super(backendService);
	}





	ngOnInit():void
	{
		this.mobile = this.platform.width() < 576;


		if (this.report.formula.code == EnumReport.DRIVER.code)
		{
			this.platform.resize
				   .pipe(untilDestroyed(this))
				   .subscribe(() => {

					   this.mobile = this.platform.width() < 576;
				   });


			// items in body
			if (this.report.items.length)
			{
				// 1 items
				if (this.report.items[0].value.length == 1)
				{
					this.df = 12;
					this.sm = 12;
					this.md = 12;
					this.lg = 12;
					this.xl = 12;
				}
				// 2 items
				else if (this.report.items[0].value.length == 2)
				{
					this.df = 12;
					this.sm = 6;
					this.md = 6;
					this.lg = 6;
					this.xl = 6;
				}
				// 3 items
				else if (this.report.items[0].value.length == 3)
				{
					this.df = 12;
					this.sm = 6;
					this.md = 4;
					this.lg = 4;
					this.xl = 4;
				}
				// 4|5 items
				else if (this.report.items[0].value.length == 4 || this.report.items[0].value.length == 5)
				{
					this.df = 12;
					this.sm = 6;
					this.md = 4;
					this.lg = 3;
					this.xl = 3;
				}
				// 5+
				else
				{
					this.df = 12;
					this.sm = 6;
					this.md = 4;
					this.lg = 3;
					this.xl = 2;
				}
			}
		}
	}





	ngOnDestroy():void
	{
	}





	HTML():string
	{
		let html:string = "";
		let code:string = "";


		html = `<div style="text-align:center;">
				<img style="width: 75%; height: 75%;" src="https://www.authoritti.io/uploads/report.png">
			   </div>
			   <h3 style="font-family: Verdana; text-align:center;"><span style="margin-right: 24px">${this.backendService.signedInUser.name}</span>|<span style="margin-left: 24px">${this.date}</span></h3>`;


		for (let itemReport of this.report.items)
		{
			code += `
<h1 style="font-family: Verdana; text-align:center;">${itemReport.key}</h1>
<table style="width:100%">
`;

			for (let i:number = 0; i < itemReport.value.length; ++i)
			{
				// start
				if (i % 3 == 0)
				{
					code += "<tr>";
				}


				let item = itemReport.value[i];
				code += `
<td style="font-family: Verdana; text-align:center; font-size:14px; padding:8px 0 16px; width: 33%">
<p style="margin: 0">${item.key}</p>
<p style="margin: 4px 0">${item.value}%</p>
</td>`;


				// end
				if (i % 3 == 2 || i == itemReport.value.length - 1)
				{
					code += "</tr>";
				}
			}
		}


		code += `</table>`;
		code += this.getFooter();


		return html + code;
	}
}
