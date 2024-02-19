// @ts-check

import { defineFlatConfig } from "@ayingott/eslint-config"

export default defineFlatConfig(
  [
    {
      rules: {
        "import/no-default-export": "off",
        "no-console": "off",
        "react-hooks/exhaustive-deps": "off",
      },
    },
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
