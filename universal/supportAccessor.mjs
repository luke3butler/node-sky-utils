import { supportDefineProperties } from "./supportDefineProperties";
export var supportAccessor = supportDefineProperties || !!Object.prototype.__defineSetter__;