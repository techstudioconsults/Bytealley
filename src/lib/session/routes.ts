/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/career",
  "/faqs",
  "privacy-policy",
  "/terms",
  "/about-us",
  "/pricing",
  "/contact-us",
  "/waitlist",
  "/blog",
];

/**
 * An array of auth routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
];

/**
 * The default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";

/**
 * An array of routes that are accessible to the admin
 * These routes require authentication
 * @type {string[]}
 */
export const adminRoutes: string[] = ["/admin/home", "/admin/users"];
