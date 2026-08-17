/**
 * Facts about the published SDK, kept in one place because they are quoted on
 * the home page, the SDK page, and in structured data. Everything here tracks
 * `@inklethq/sdk` — when the package ships a release, this file moves with it.
 */

export const PACKAGE_NAME = "@inklethq/sdk";
export const SDK_VERSION = "0.1.0";

export const GITHUB_URL = "https://github.com/inklethq/sdk";
export const NPM_URL = "https://www.npmjs.com/package/@inklethq/sdk";
export const DOCS_URL = "https://docs.iminklet.com";

/**
 * `DEFAULT_INKLET_BASE_URL` in the SDK. The service is still on the developer
 * preview host; `baseUrl` is how a caller points at a Compute Hub instead.
 */
export const API_BASE_URL = "https://dev.iminklet.com";

/** Limits the SDK enforces before a request leaves the process. */
export const MAX_ASSET_SIZE_MIB = 10;
export const MAX_ASSETS_PER_CONTENT = 50;
