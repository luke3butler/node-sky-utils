import { hasEnumBug } from "./hasEnumBug";
import { forIn as compat_forIn } from "../compat/forIn";
import { forIn as modren_forIn } from "../modern/forIn";

export var forIn = hasEnumBug ? compat_forIn : modren_forIn;