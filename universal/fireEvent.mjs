
import {fireEvent as compat_fireEvent} from "../compat/fireEvent";
import {fireEvent as modern_fireEvent} from "../modern/fireEvent";

export var fireEvent=document.addEventListener?modern_fireEvent:compat_fireEvent;