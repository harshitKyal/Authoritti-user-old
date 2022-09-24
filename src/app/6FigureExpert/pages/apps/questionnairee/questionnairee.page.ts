import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PageService} from "../../../services/page.service";
import {ArrowNavigationService} from "../../../../Arrow/services/navigation/arrow-navigation.service";
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../../../../services/backend.service";
import {ArrowLoaderService} from "../../../../Arrow/services/loader/arrow-loader.service";
import {ArrowAlertService} from "../../../../Arrow/services/alert/arrow-alert.service";
import {BasePageDynamic} from "../../../base/BasePageDynamic";


@Component({
	selector   : 'app-page',
	templateUrl: './questionnairee.page.html',
	styleUrls  : ['./questionnairee.page.scss'],
})
export class QuestionnaireePage extends BasePageDynamic implements AfterViewInit
{
	@ViewChild('cardHeader', {read: ElementRef, static: false}) cardHeader:ElementRef;
	@ViewChild('cardContent', {static: false}) cardContent;





	constructor(route:ActivatedRoute,
			  navController:ArrowNavigationService,
			  pageService:PageService,
			  backendService:BackendService,
			  loaderService:ArrowLoaderService,
			  alertService:ArrowAlertService)
	{
		super(route, navController, pageService, backendService, loaderService, alertService);
	}





	ngAfterViewInit():void
	{
		if (this.page.questionnaire.hide_title)
		{
			return;
		}


		setTimeout(() => {
			this.cardContent.el.style.maxHeight = `calc(100vh - ${122 + this.cardHeader.nativeElement.offsetHeight}px)`;
		}, 250);
	}
}
