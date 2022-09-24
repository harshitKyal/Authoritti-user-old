import {
	EnumApp,
	EnumCloseRate,
	EnumDynamicQuestion,
	EnumField,
	EnumPage,
	EnumQuestion,
	EnumReport,
	EnumRole,
	EnumRoute,
	EnumSource,
	EnumTemplate,
	EnumType
} from "../enums/Enums";
import {DataManager} from "../managers/DataManager";


export class Base
{
	public get dataManager():DataManager
	{
		return DataManager.instance;
	}





	public get EnumRoute()
	{
		return EnumRoute;
	}





	public get EnumField()
	{
		return EnumField;
	}





	public get EnumPage()
	{
		return EnumPage;
	}





	public get EnumQuestion()
	{
		return EnumQuestion;
	}





	public get EnumApp()
	{
		return EnumApp;
	}





	public get EnumReport()
	{
		return EnumReport;
	}





	public get EnumType()
	{
		return EnumType;
	}





	public get EnumCloseRate()
	{
		return EnumCloseRate;
	}





	public get EnumDynamicQuestion()
	{
		return EnumDynamicQuestion;
	}





	public get EnumTemplate()
	{
		return EnumTemplate;
	}





	public get EnumSource()
	{
		return EnumSource;
	}





	public get EnumRole()
	{
		return EnumRole;
	}
}
