declare interface BrainCloudWrapper
{
	new():BrainCloudWrapper;

	brainCloudClient:BrainCloudClient;
	script:Script;
	time: Time;

	initialize(appId:string, secret:string, appVersion:string):void;

	authenticateUniversal(userId:string, password:string, forceCreate:boolean, result:Function):void;
	authenticateEmailPassword(email:string, password:string, forceCreate:boolean, result:Function):void;
	resetEmailPassword(email:string, result:Function):void;
}
declare var BrainCloudWrapper:BrainCloudWrapper;





interface BrainCloudClient
{
	isInitialized():boolean;
	setErrorCallback(handler:Function):void
}


interface Script
{
	runScript(scriptName, jsonScriptData, result:Function):void;
}


interface Time
{
	readServerTime(handler:Function):void
}
