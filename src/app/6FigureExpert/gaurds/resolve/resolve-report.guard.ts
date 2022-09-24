import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {VOPage} from "../../../vo/VOPage";
import {PageService} from "../../services/page.service";
import {ReportService} from "../../services/report.service";
import {BackendService} from "../../../services/backend.service";


@Injectable({
	providedIn: 'root'
})
export class ResolveReportGuard implements Resolve<VOPage>
{
	constructor(private pageService:PageService,
			  private reportService:ReportService,
			  private backendService:BackendService)
	{
	}





	resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<VOPage> | Promise<VOPage> | VOPage
	{
		console.log('ResolveReportGuard');


		let page:VOPage = this.pageService.currentPage;
		let pages:VOPage[] = this.backendService.getPages();


		if (page)
		{
			page.report.items = this.reportService.generateReport(pages, page.report);
		}


		return page;
	}
}
