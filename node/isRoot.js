import { currentUser } from "./currentUser";
/**
 * Is the executing user root?
 */
export const isRoot = () => currentUser() === 'root';