// Match the primary host served by the production deployment.
export const SITE_URL = "https://www.iminklet.com";
export const SITE_NAME = "inklet";
export const HOME_TITLE = "inklet - Ambient E-Ink Displays for Your Second Brain";
export const HOME_DESCRIPTION =
  "Bring notes, PDFs, tasks, and schedules into the right room with inklet ambient e-ink displays. A calmer way to keep useful information in view.";

export function siteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
