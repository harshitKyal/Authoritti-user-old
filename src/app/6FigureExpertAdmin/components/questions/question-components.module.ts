import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SliderComponent} from "./slider/slider.component";
import {TextInputComponent} from "./text-input/text-input.component";
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckComponent} from "./check/check.component";
import {MultiTextInputComponent} from "./multi-text-input/multi-text-input.component";
import {RadioComponent} from "./radio/radio.component";
import {TextAreaComponent} from "./text-area/text-area.component";
import {DynamicSliderComponent} from "./dynamic-slider/dynamic-slider.component";
import {TableYesNoComponent} from "./table-yes-no/table-yes-no.component";
import {TableDropDownComponent} from "./table-drop-down/table-drop-down.component";
import {PipesModule} from "../../../pipes/pipes.module";
import {CheckGroupComponent} from "./check-group/check-group.component";
import {TableSkillComponent} from "./table-skill/table-skill.component";
import {TableTraitComponent} from "./table-trait/table-trait.component";
import {TableSkillTraitComponent} from "./table-skill-trait/table-skill-trait.component";


@NgModule({
	declarations: [
		SliderComponent,
		TextInputComponent,
		CheckComponent,
		MultiTextInputComponent,
		RadioComponent,
		TextAreaComponent,
		DynamicSliderComponent,
		TableYesNoComponent,
		TableDropDownComponent,
		CheckGroupComponent,
		TableSkillComponent,
		TableTraitComponent,
		TableSkillTraitComponent,
	],
	imports     : [
		CommonModule,
		IonicModule,
		FormsModule,
		ReactiveFormsModule,
		PipesModule,
	],
	exports     : [
		SliderComponent,
		TextInputComponent,
		CheckComponent,
		MultiTextInputComponent,
		RadioComponent,
		TextAreaComponent,
		DynamicSliderComponent,
		TableYesNoComponent,
		TableDropDownComponent,
		CheckGroupComponent,
		TableSkillComponent,
		TableTraitComponent,
		TableSkillTraitComponent,
	]
})
export class QuestionComponentsModule
{
}
