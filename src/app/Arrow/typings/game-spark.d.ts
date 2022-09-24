declare interface GameSparks
{
	new():GameSparks;

	initPreview(options:any):void;

	initLive(options:any):void;

	sendWithData(requestType:string, payload:any, onResponseCallback:(response:any) => void):void;
}


declare var GameSparks:GameSparks;
declare var CryptoJS:any;
