import {attachEvent as compat_attachEvent} from "../compat/attachEvent";
import {attachEvent as modern_attachEvent} from "../modern/attachEvent";

export var attachEvent=document.addEventListener?modern_attachEvent:compat_attachEvent;