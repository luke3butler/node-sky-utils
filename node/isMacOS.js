import { osIs } from "./osIs";
/**
 * Returns true if node is running on macOS
 */
export const isMacOS = () => osIs('darwin');