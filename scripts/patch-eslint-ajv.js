/**
 * Postinstall script to patch eslint and @eslint/eslintrc ajv usage
 * for compatibility with ajv v8. Both internally use ajv v6 API,
 * but we've overridden ajv to v8 globally for security (CVE fix).
 */
const fs = require("fs");
const path = require("path");

// Patch 1: eslint/lib/shared/ajv.js
const eslintAjvPath = path.join(
  __dirname, "..", "node_modules", "eslint", "lib", "shared", "ajv.js"
);

const eslintAjvPatch = `/**
 * @fileoverview The instance of Ajv validator.
 * Patched for ajv v8 compatibility.
 */
"use strict";

const Ajv = require("ajv");

module.exports = (additionalOptions = {}) => {
\tconst { missingRefs, schemaId, ...opts } = additionalOptions;
\tconst ajv = new Ajv({
\t\tuseDefaults: true,
\t\tvalidateSchema: false,
\t\tverbose: true,
\t\tallErrors: true,
\t\tstrict: false,
\t\t...opts,
\t});

\treturn ajv;
};
`;

if (fs.existsSync(eslintAjvPath)) {
  fs.writeFileSync(eslintAjvPath, eslintAjvPatch);
  console.log("Patched eslint/lib/shared/ajv.js");
}

// Patch 2: @eslint/eslintrc ajvOrig function in eslintrc-universal.cjs
const eslintrcPath = path.join(
  __dirname, "..", "node_modules", "@eslint", "eslintrc", "dist", "eslintrc-universal.cjs"
);

if (fs.existsSync(eslintrcPath)) {
  let content = fs.readFileSync(eslintrcPath, "utf8");

  // Replace the ajvOrig function that uses ajv v6 API
  const oldPattern = /var ajvOrig = \(additionalOptions = \{\}\) => \{[\s\S]*?return ajv;\s*\};/;
  const newFunction = `var ajvOrig = (additionalOptions = {}) => {
    const { missingRefs, schemaId, ...opts } = additionalOptions;
    const ajv = new Ajv__default["default"]({
        useDefaults: true,
        validateSchema: false,
        verbose: true,
        allErrors: true,
        strict: false,
        ...opts
    });

    return ajv;
};`;

  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newFunction);
    fs.writeFileSync(eslintrcPath, content);
    console.log("Patched @eslint/eslintrc/dist/eslintrc-universal.cjs");
  } else {
    console.log("Warning: Could not find ajvOrig pattern in eslintrc-universal.cjs");
  }
}

// Patch 3: @eslint/eslintrc eslintrc.cjs (the full version)
const eslintrcFullPath = path.join(
  __dirname, "..", "node_modules", "@eslint", "eslintrc", "dist", "eslintrc.cjs"
);

if (fs.existsSync(eslintrcFullPath)) {
  let content = fs.readFileSync(eslintrcFullPath, "utf8");

  const oldPattern = /var ajvOrig = \(additionalOptions = \{\}\) => \{[\s\S]*?return ajv;\s*\};/;
  const newFunction = `var ajvOrig = (additionalOptions = {}) => {
    const { missingRefs, schemaId, ...opts } = additionalOptions;
    const ajv = new Ajv__default["default"]({
        useDefaults: true,
        validateSchema: false,
        verbose: true,
        allErrors: true,
        strict: false,
        ...opts
    });

    return ajv;
};`;

  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newFunction);
    fs.writeFileSync(eslintrcFullPath, content);
    console.log("Patched @eslint/eslintrc/dist/eslintrc.cjs");
  }
}

console.log("Done patching eslint for ajv v8 compatibility.");
