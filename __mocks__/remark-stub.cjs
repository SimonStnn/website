/**
 * CJS stub for the `remark` package used in Jest tests.
 * The real package is pure ESM and can't be loaded by Jest's CJS transform.
 * Production code uses the real package; tests use this stub via moduleNameMapper.
 */

function remark() {
  /** @type {any} */
  const processor = {
    use: function () {
      return processor; // chainable
    },
    process: async function (content) {
      // Very basic markdown → HTML: wrap paragraphs and handle bold/italic
      const html = String(content)
        .trim()
        .split(/\n\n+/)
        .map((para) => `<p>${para.trim()}</p>`)
        .join("\n");
      return {
        toString: function () {
          return html;
        },
      };
    },
  };
  return processor;
}

module.exports = { remark };
