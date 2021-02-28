import { escapeHtml } from "./escapeHtml.mjs";
import { replaceAll } from "./replaceAll.mjs";
export function escapeAttribute(str, quot) {
	var esc = escapeHtml(str);
	if(!quot || quot == '"') {
		return esc.replace(/"/g, '&quot;');
	} else {
		return replaceAll(esc, quot.charAt(0), '&#' + quot.charCodeAt(0) + ";");
	}
};