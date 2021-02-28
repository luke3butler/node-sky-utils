import { getScript as compat_getScript } from "../compat/getScript";
import { getScript as modern_getScript } from "../modern/getScript";

export var getScript = ("onload" in document.scripts[0]) ? modern_getScript : compat_getScript;