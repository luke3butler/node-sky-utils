import { supportCurrentScript } from "./supportCurrentScript";
import { getCurrentScript as ie_getCurrentScript } from "../compat/getCurrentScript";
import { getCurrentScript as doc_getCurrentScript } from "../module/getCurrentScript";

var stackResultName, stackResultPattern, supportStack;
export function getCurrentPathInit() {
	if(supportStack != undefined) {
		return supportStack;
	}
	document.addEventListener('load', function(e) {
		if(e.target.tagName === "SCRIPT") {
			e.target.readyState = "complete";
		}
	}, true);
	try {
		throw new Error('get stack');
	} catch(e) {
		var stackHandler = {
			'stack': [
				/^@(.*):\d+$/,// Firefox
				/^\s+at (.*):\d+:\d+$/,//Chrome
				/^\s+at [^\(]*\((.*):\d+:\d+\)$/ //IE11
			],
			'stacktrace': [
				/\(\) in\s+(.*?\:\/\/\S+)/m//opera
			]
		};
		for(var name in stackHandler) {
			var stacks = e[name];
			if(stacks) {
				var patterns = stackHandler[name];
				var stack = getLastStack(stacks);
				var i = patterns.length;
				while(i--) {
					var pattern = patterns[i];
					if(pattern.test(stack)) {
						stackResultName = name;
						stackResultPattern = pattern;
						supportStack = true;
						return true;
					}
				}
			}
		}
	}
	return false;
}
function getCurrentPathByStack() {
	try {
		throw new Error('get stack');
	} catch(e) {
		var arr = getLastStack(e[stackResultName]).match(stackResultPattern);
		if(arr) {
			//如果路径与html路径相同，说明是直接标签运行
			if(arr[1] != location.href && arr[1] != location.origin + location.pathname + location.search) {
				return arr[1];
			}
		}
	}
}
function getLastStack(stack) {
	var stacks = stack.trim().split("\n");
	return stacks[stacks.length - 1];
}

function getCurrentScriptByStack() {
	var path = getCurrentPathByStack();
	var nodes = document.scripts;
	var arr = [];
	for(var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		if(node.readyState === "complete") {
			continue;
		}
		if(node.src) {
			if(path !== new URL(node.src, location).href) {
				continue;
			}
		} else if(path) {
			continue;
		}
		arr.push(node);
	}
	nodes = null;
	if(arr.length) {
		return arr[arr.length - 1];
	}
	return null;
}

var getCurrentScript;
if(support) {
	getCurrentScript = doc_getCurrentScript;
} else {
	if("readyState" in document.scripts[0]) {
		getCurrentScript = ie_getCurrentScript;
	} else {
		getCurrentPathInit();
		getCurrentScript = getCurrentScriptByStack;
	}
}
export { getCurrentScript };