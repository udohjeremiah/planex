import { RuleConfigSeverity } from "@commitlint/types";

/**
 * @see https://commitlint.js.org/reference/configuration.html
 * @type {import("@c").UserConfig}
 */
const commitLintConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "references-empty": [RuleConfigSeverity.Warning, "never"],
    "footer-max-line-length": [RuleConfigSeverity.Disabled, "always"],
    "body-max-line-length": [RuleConfigSeverity.Disabled, "always"],
  },
};

export default commitLintConfig;
