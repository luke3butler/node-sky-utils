import {detachEvent as compat_detachEvent} from "../compat/detachEvent";
import {detachEvent as modern_detachEvent} from "../modern/detachEvent";

export var detachEvent=document.addEventListener?modern_detachEvent:compat_detachEvent;