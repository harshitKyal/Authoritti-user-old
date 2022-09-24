import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {HeaderReportComponent} from "./header/header-report.component";
import {ArchetypeComponent} from "./report/archetype/archetype.component";
import {EgotisticComponent} from "./report/egotistic/egotistic.component";
import {TraitsComponent} from "./report/traits/traits.component";
import {SimpleComponent} from "./report/simple/simple.component";
import {FinancialGoalComponent} from "./report/financial-goal/financial-goal.component";
import {SkillsComponent} from "./report/skills/skills.component";


@NgModule({
	declarations: [
		HeaderReportComponent,
		ArchetypeComponent,
		EgotisticComponent,
		TraitsComponent,
		SimpleComponent,
		FinancialGoalComponent,
		SkillsComponent,
	],
	imports     : [
		CommonModule,
		IonicModule,
	],
	exports     : [
		HeaderReportComponent,
		ArchetypeComponent,
		EgotisticComponent,
		TraitsComponent,
		SimpleComponent,
		FinancialGoalComponent,
		SkillsComponent,
	]
})
export class ReportsModule
{
}
