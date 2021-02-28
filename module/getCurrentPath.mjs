export function getCurrentPath(){
	var script=document.currentScript;
	if(script){
		return new URL(script.src, location).href;
	}
}