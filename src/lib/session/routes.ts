/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/features",
  "/expore/*",
  "/pricing",
  "/terms-and-conditions",
  "/privacy-policy",
  "/about-us",
  "/contact",
];

/**
 * An array of auth routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/fetching-data/*",
];

/**
 * An array of routes accessible to authenticated users (user-admin)
 * These routes are specific to each user's dashboard
 * @type {string[]}
 */
export const userRoutes: string[] = [
  "/dashboard/:userID/home",
  "/dashboard/:userID/profile",
  "/dashboard/:userID/settings",
];

/**
 * An array of routes accessible to admin users (super-admin)
 * These routes allow management of users and app features
 * @type {string[]}
 */
export const adminRoutes: string[] = ["/admin/home", "/admin/users", "/admin/settings", "/admin/reports"];

/**
 * An array of routes accessible only to super-super admins
 * These routes provide complete control over the application
 * @type {string[]}
 */
export const superAdminRoutes: string[] = [
  ...adminRoutes, // Has access to all admin routes
  "/super-admin/dashboard",
  "/super-admin/admin-management", // Can manage other admins
  "/super-admin/system-settings", // Global system settings
  "/super-admin/audit-logs", // View all system logs
];

/**
 * Helper function to check if a route is specific to a user
 * @param userID - The ID of the logged-in user
 * @param route - The route to check
 * @returns {boolean}
 */
export const isUserSpecificRoute = (userID: string, route: string): boolean => {
  return route.includes(`:userID`);
};
