import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from './environments/environment';

// import {AppModule} from './app/6FigureExpertAdmin/app.module';
import {AppModule} from './app/6FigureExpert/app.module';


if (environment.production)
{
	enableProdMode();


	console.log = function () {
	};
}

platformBrowserDynamic().bootstrapModule(AppModule)
	   .catch(err => console.log(err));


/* BUGS

1- MinMax limit in MultiChoiceGroup

 */
