import { supportProto } from "./supportProto";
import { inherits as compat_inherits } from "../compat/inherits";
import { inherits as modern_inherits } from "../modern/inherits";

export var inherits = supportProto ? modern_inherits : compat_inherits;