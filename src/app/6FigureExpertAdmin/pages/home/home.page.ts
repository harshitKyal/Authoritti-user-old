import {Component, OnInit} from '@angular/core';
import {ArrowMenuService} from "../../../Arrow/services/menu/arrow-menu.service";
import {EnumField} from "../../../enums/Enums";


@Component({
	selector   : 'app-home',
	templateUrl: 'home.page.html',
	styleUrls  : ['home.page.scss'],
})
export class HomePage implements OnInit
{
	public bg:string = "assets/images/test.gif";





	constructor(public menuService:ArrowMenuService)
	{
	}





	ngOnInit():void
	{
		this.menuService.show(EnumField.LEFT_MENU);
	}
}
