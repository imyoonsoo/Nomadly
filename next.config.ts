import type { NextConfig } from "next";
import type { RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              replaceAttrValues: {
                black: "currentColor",
                "#000": "currentColor",
                "#1F1F22": "currentColor",
                "#707177": "currentColor",

                "#3891dd": "currentColor",
                "#3c1e1e": "currentColor",
                "#efd118": "currentColor",
                "#012155": "currentColor",
                "#84858c": "currentColor",
              },
            },
          },
        ],
        as: "*.js",
      },
    },
  },

  webpack(config) {
    const rules = config.module.rules as RuleSetRule[];

    const fileLoaderRule = rules.find(
      (rule): rule is RuleSetRule =>
        typeof rule === "object" &&
        rule !== null &&
        "test" in rule &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg"),
    );

    if (!fileLoaderRule) {
      return config;
    }

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule?.issuer,
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              replaceAttrValues: {
                black: "currentColor",
                "#000": "currentColor",
                "#1F1F22": "currentColor",
                "#707177": "currentColor",

                "#3891dd": "currentColor",
                "#3c1e1e": "currentColor",
                "#efd118": "currentColor",
                "#012155": "currentColor",
                "#84858c": "currentColor",
              },
            },
          },
        ],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};
export default nextConfig;
