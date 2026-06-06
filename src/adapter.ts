import type { ServeConfig } from "@criteria/adapter-sdk";

/**
 * A minimal hello-world adapter. Edit this file to build your own:
 *   - change name/version/description/source_url
 *   - declare config_schema / input_schema / output_schema as needed
 *   - implement execute()
 */
export const adapterConfig: ServeConfig = {
  name: "my-adapter",
  version: "0.1.0",
  description: "A starter Criteria adapter",
  source_url: "https://github.com/your-org/your-adapter",
  capabilities: ["execute"],
  platforms: ["linux/amd64", "linux/arm64", "darwin/arm64"],
  input_schema: {
    fields: {
      name: { type: "string", required: false, description: "Who to greet" },
    },
  },
  output_schema: {
    fields: {
      greeting: { type: "string", description: "The greeting produced" },
    },
  },

  async execute(req, helpers) {
    const who = req.input?.name || "world";
    const greeting = `Hello, ${who}!`;
    await helpers.log.stdout(greeting + "\n");
    await helpers.outcomes.finalize("greet", { reason: greeting });
  },
};
