export function getCurrentPath() {
	var script=getCurrentScript();
	if(script){
		return new URL(script.src, location).href;
	}
}