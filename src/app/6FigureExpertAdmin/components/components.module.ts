import {NgModule} from '@angular/core';
import {QuestionComponentsModule} from "./questions/question-components.module";
import {PageComponentsModule} from "./pages/page-components.module";


@NgModule({
	declarations: [],
	imports     : [
		PageComponentsModule,
		QuestionComponentsModule,
	],
	exports     : [
		PageComponentsModule,
		QuestionComponentsModule,
	]
})
export class ComponentsModule
{
}
