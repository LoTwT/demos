// @ts-check

import { defineFlatConfig } from "@ayingott/eslint-config"

export default defineFlatConfig(
  [
    {
      ignores: [
        "packages/compile-basic/**",
        "packages/jquery/**",
        "packages/official-site/**",
        "packages/ssr/**",
        "packages/ts-compiler-api/**",
      ],
    },
  ],
  {
    prettier: true,
    vue: false,
    unocss: false,
    react: true,
  },
)
