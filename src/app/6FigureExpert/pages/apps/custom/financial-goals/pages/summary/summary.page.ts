import { Component } from "@angular/core";
import { BasePageFinancialGoals } from "../../base/BasePageFinancialGoals";
import { ActivatedRoute } from "@angular/router";
import { ArrowNavigationService } from "../../../../../../../Arrow/services/navigation/arrow-navigation.service";
import { PageService } from "../../../../../../services/page.service";
import { BackendService } from "../../../../../../../services/backend.service";
import { ArrowLoaderService } from "../../../../../../../Arrow/services/loader/arrow-loader.service";
import { ArrowAlertService } from "../../../../../../../Arrow/services/alert/arrow-alert.service";
import { ReportService } from "src/app/6FigureExpert/services/report.service";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.page.html",
  styleUrls: ["./summary.page.scss"],
})
export class SummaryPage extends BasePageFinancialGoals {
  public report;
  public reportType: number;

  public reports: any[] = ["Yearly", "Monthly", "Weekly", "Daily", "All"];

  constructor(
    route: ActivatedRoute,
    navController: ArrowNavigationService,
    pageService: PageService,
    backendService: BackendService,
    loaderService: ArrowLoaderService,
    alertService: ArrowAlertService,
    private reportService: ReportService
  ) {
    super(
      route,
      navController,
      pageService,
      backendService,
      loaderService,
      alertService
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.reportType = 0;
    this.changeReport(this.reportType);
  }

  public changeReport(value: number): void {
    switch (value) {
      case 0:
        this.report = [this.calculateReportYearly()];
        break;

      case 1:
        this.report = [this.calculateReportMonthly()];
        break;

      case 2:
        this.report = [this.calculateReportWeekly()];
        break;

      case 3:
        this.report = [this.calculateReportDaily()];
        break;

      case 4:
        this.report = this.calculateReportAll();
        break;
    }

    this.backendService.financialGoalReport = this.report;
  }

  private calculateReportYearly(): any {
    let date: Date = new Date();
    let yearDays: number = this.dataManager.isLeapYear(date.getFullYear())
      ? 366
      : 365;

    return {
      key: "Yearly",
      value: this.reportService.calculate(yearDays, this.financialGoal),
    };
  }

  private calculateReportMonthly(): any {
    let date: Date = new Date();
    let monthDays: number = this.dataManager.daysInMonth(
      date.getFullYear(),
      date.getMonth()
    );

    return {
      key: "Monthly",
      value: this.reportService.calculate(monthDays, this.financialGoal),
    };
  }

  private calculateReportWeekly(): any {
    let date: Date = new Date();
    let weeks: number =
      this.dataManager.daysInMonth(date.getFullYear(), date.getMonth()) / 7;

    return {
      key: "Weekly",
      value: this.reportService.calculate(weeks, this.financialGoal),
    };
  }

  private calculateReportDaily(): any {
    return {
      key: "Daily",
      value: this.reportService.calculate(1, this.financialGoal),
    };
  }

  private calculateReportAll(): any {
    return [
      this.calculateReportYearly(),
      this.calculateReportMonthly(),
      this.calculateReportWeekly(),
      this.calculateReportDaily(),
    ];
  }

}
