import {NavigationOptions} from "@ionic/angular/providers/nav-controller";


export interface ArrowNavigationOptions extends NavigationOptions
{
	id?:string;
	skipUrlCount?:number;
}
