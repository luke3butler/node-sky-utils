const os = require('os');
/**
 * Return the current user
 */
export const currentUser = () => os.userInfo().username;