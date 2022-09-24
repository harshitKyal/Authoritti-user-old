import {VOBase} from "./base/VOBase";
import {VOSlider} from "./VOSlider";
import {EnumDynamicQuestion, EnumField, EnumQuestion} from "../enums/Enums";
import {VOTextInput} from "./VOTextInput";
import {VOCheck} from "./VOCheck";
import {VOMultiTextInput} from "./VOMultiTextInput";
import {VORadio} from "./VORadio";
import {VOTextArea} from "./VOTextArea";
import {VOTableYesNo} from "./VOTableYesNo";
import {VOTableDropDown} from "./VOTableDropDown";
import {VOCheckGroup} from "./VOCheckGroup";
import {VOTableSkill} from "./VOTableSkill";
import {VOTableTrait} from "./VOTableTrait";
import {VOTableSkillTrait} from "./VOTableSkillTrait";


export class VOQuestion extends VOBase
{
	public source:string;

	public slider?:VOSlider;
	public text_input?:VOTextInput;
	public check?:VOCheck;
	public multi_text_input?:VOMultiTextInput;
	public radio?:VORadio;
	public text_area?:VOTextArea;
	public table_yes_no?:VOTableYesNo;
	public table_drop_down?:VOTableDropDown;
	public check_group?:VOCheckGroup;
	public table_skill?:VOTableSkill;
	public table_trait?:VOTableTrait;
	public table_skill_trait?:VOTableSkillTrait;





	constructor(init?:Partial<any>)
	{
		super(init);


		if (init)
		{
			this.source = init[EnumField.SOURCE];


			switch (this.type)
			{
				case EnumQuestion.SLIDER:
					this.slider = new VOSlider(init[EnumField.SLIDER]);
					break;


				case EnumQuestion.TEXT_INPUT:
					this.text_input = new VOTextInput(init[EnumField.TEXT_INPUT]);
					break;


				case EnumQuestion.MULTI_CHOICE:
					this.check = new VOCheck(init[EnumField.CHECK]);
					break;


				case EnumQuestion.MULTI_TEXT_INPUT:
					this.multi_text_input = new VOMultiTextInput(init[EnumField.MULTI_TEXT_INPUT]);
					break;


				case EnumQuestion.SINGLE_CHOICE:
					this.radio = new VORadio(init[EnumField.RADIO]);
					break;


				case EnumQuestion.TEXT_AREA:
					this.text_area = new VOTextArea(init[EnumField.TEXT_AREA]);
					break;


				case EnumDynamicQuestion.TABLE_YES_NO:
					this.table_yes_no = new VOTableYesNo(init[EnumField.TABLE_YES_NO]);
					break;


				case EnumDynamicQuestion.TABLE_DROP_DOWN:
					this.table_drop_down = new VOTableDropDown(init[EnumField.TABLE_DROP_DOWN]);
					break;


				case EnumDynamicQuestion.MULTI_CHOICE_GROUP:
					this.check_group = new VOCheckGroup(init[EnumField.CHECK_GROUP]);
					break;


				case EnumDynamicQuestion.TABLE_SKILL:
					this.table_skill = new VOTableSkill(init[EnumField.TABLE_SKILL]);
					break;


				case EnumDynamicQuestion.TABLE_TRAIT:
					this.table_trait = new VOTableTrait(init[EnumField.TABLE_TRAIT]);
					break;


				case EnumDynamicQuestion.TABLE_SKILL_TRAIT:
					this.table_skill_trait = new VOTableSkillTrait(init[EnumField.TABLE_SKILL_TRAIT]);
					break;
			}
		}
	}





	public get answerId():string
	{
		return `${this.type}_${this.auid}`;
	}





	public get answer():any
	{
		switch (this.type)
		{
			case EnumQuestion.SLIDER:
				return this.slider.finalAnswer;


			case EnumQuestion.TEXT_INPUT:
				return this.text_input.finalAnswer;


			case EnumQuestion.MULTI_CHOICE:
				return this.check.finalAnswer;


			case EnumQuestion.MULTI_TEXT_INPUT:
				return this.multi_text_input.finalAnswer;


			case EnumQuestion.SINGLE_CHOICE:
				return this.radio.finalAnswer;


			case EnumQuestion.TEXT_AREA:
				return this.text_area.finalAnswer;


			case EnumDynamicQuestion.TABLE_YES_NO:
				return this.table_yes_no.finalAnswer;


			case EnumDynamicQuestion.TABLE_DROP_DOWN:
				return this.table_drop_down.finalAnswer;


			case EnumDynamicQuestion.MULTI_CHOICE_GROUP:
				return this.check_group.finalAnswer;


			case EnumDynamicQuestion.TABLE_SKILL:
				return this.table_skill.finalAnswer;


			case EnumDynamicQuestion.TABLE_TRAIT:
				return this.table_trait.finalAnswer;


			case EnumDynamicQuestion.TABLE_SKILL_TRAIT:
				return this.table_skill_trait.finalAnswer;


			default:
				console.log("GetAnswer:", this.type);
		}
	}





	public set answer(value:any)
	{
		switch (this.type)
		{
			case EnumQuestion.SLIDER:
				this.slider.finalAnswer = value;
				break;


			case EnumQuestion.TEXT_INPUT:
				this.text_input.finalAnswer = value;
				break;


			case EnumQuestion.MULTI_CHOICE:
				this.check.finalAnswer = value;
				break;


			case EnumQuestion.MULTI_TEXT_INPUT:
				this.multi_text_input.finalAnswer = value;
				break;


			case EnumQuestion.SINGLE_CHOICE:
				this.radio.finalAnswer = value;
				break;


			case EnumQuestion.TEXT_AREA:
				this.text_area.finalAnswer = value;
				break;


			case EnumDynamicQuestion.TABLE_YES_NO:
				this.table_yes_no.finalAnswer = value;
				break;


			case EnumDynamicQuestion.TABLE_DROP_DOWN:
				this.table_drop_down.finalAnswer = value;
				break;


			case EnumDynamicQuestion.MULTI_CHOICE_GROUP:
				this.check_group.finalAnswer = value;
				break;


			case EnumDynamicQuestion.TABLE_SKILL:
				this.table_skill.finalAnswer = value;
				break;


			case EnumDynamicQuestion.TABLE_TRAIT:
				this.table_trait.finalAnswer = value;
				break;


			case EnumDynamicQuestion.TABLE_SKILL_TRAIT:
				this.table_skill_trait.finalAnswer = value;
				break;


			default:
				console.log("SetAnswer:", this.type);
		}
	}





	public get hasAnswer():boolean
	{
		switch (this.type)
		{
			case EnumQuestion.SLIDER:
				return this.slider.hasAnswer;


			case EnumQuestion.TEXT_INPUT:
				return this.text_input.hasAnswer;


			case EnumQuestion.MULTI_CHOICE:
				return this.check.hasAnswer;


			case EnumQuestion.MULTI_TEXT_INPUT:
				return this.multi_text_input.hasAnswer;


			case EnumQuestion.SINGLE_CHOICE:
				return this.radio.hasAnswer;


			case EnumQuestion.TEXT_AREA:
				return this.text_area.hasAnswer;


			case EnumDynamicQuestion.TABLE_YES_NO:
				return this.table_yes_no.hasAnswer;


			case EnumDynamicQuestion.TABLE_DROP_DOWN:
				return this.table_drop_down.hasAnswer;


			case EnumDynamicQuestion.MULTI_CHOICE_GROUP:
				return this.check_group.hasAnswer;


			case EnumDynamicQuestion.TABLE_SKILL:
				return this.table_skill.hasAnswer;


			case EnumDynamicQuestion.TABLE_TRAIT:
				return this.table_trait.hasAnswer;


			case EnumDynamicQuestion.TABLE_SKILL_TRAIT:
				return this.table_skill_trait.hasAnswer;


			default:
				console.log("hasAnswer:", this.type);
		}
	}





	public reset():void
	{
		switch (this.type)
		{
			case EnumQuestion.SLIDER:
				this.slider.reset();
				break;


			case EnumQuestion.TEXT_INPUT:
				this.text_input.reset();
				break;


			case EnumQuestion.MULTI_CHOICE:
				this.check.reset();
				break;


			case EnumQuestion.MULTI_TEXT_INPUT:
				this.multi_text_input.reset();
				break;


			case EnumQuestion.SINGLE_CHOICE:
				this.radio.reset();
				break;


			case EnumQuestion.TEXT_AREA:
				this.text_area.reset();
				break;


			case EnumDynamicQuestion.TABLE_YES_NO:
				this.table_yes_no.reset();
				break;


			case EnumDynamicQuestion.TABLE_DROP_DOWN:
				this.table_drop_down.reset();
				break;


			case EnumDynamicQuestion.MULTI_CHOICE_GROUP:
				this.check_group.reset();
				break;


			case EnumDynamicQuestion.TABLE_SKILL:
				this.table_skill.reset();
				break;


			case EnumDynamicQuestion.TABLE_TRAIT:
				this.table_trait.reset();
				break;


			case EnumDynamicQuestion.TABLE_SKILL_TRAIT:
				this.table_skill_trait.reset();
				break;


			default:
				console.log("reset:", this.type);
		}
	}
}
