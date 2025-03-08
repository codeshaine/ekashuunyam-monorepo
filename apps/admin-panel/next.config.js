/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",

  // Include the Prisma engine binaries
  outputFileTracingIncludes: {
    "*": ["../../packages/database/generated/client/**/*"],
  },
  transpilePackages: ["@ekashuunyam/database"],
};

export default config;
