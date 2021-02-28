export function getScript(src,func,charset){
	var script=document.createElement('script');
	script.charset=charset || "UTF-8";
	script.src=src;
	script.async=true;
	if(func){
		script.onload=func;
	}
	document.head.appendChild(script);
	return script;
};