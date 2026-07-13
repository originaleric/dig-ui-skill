import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const cliPath = path.join(repoRoot, "bin", "dig-ui-skill.mjs");

const output = invokeBridge({
  task: "design",
  prompt: "Build a production smoke UI using Dig UI.",
  options: {
    return_patch: true,
  },
});

assert.equal(output.task, "design");
assert.equal(output.catalog, "dig");
assert.equal(output.layout, "dashboard-overview");
assert.equal(output.metadata.schema_version, "dig-ui-skill.bridge.v1");
assert.equal(output.apply_plan.schema_version, "dig-ui-skill.apply_plan.v1");
assert.equal(output.apply_plan.workspace_id, "default");
assert.equal(output.artifact_outputs.length, 2);

const fileArtifact = output.artifact_outputs.find((item) => item.label === "file1");
const diffArtifact = output.artifact_outputs.find((item) => item.label === "diff1");
assert.equal(fileArtifact.role, "file_content");
assert.equal(diffArtifact.role, "diff");
assert.equal(fileArtifact.content_type, "text/plain");
assert.equal(diffArtifact.content_type, "text/x-diff");

const operation = output.apply_plan.operations[0];
assert.equal(operation.action, "update");
assert.equal(operation.path, "src/App.tsx");
assert.equal(operation.content_artifact_label, "file1");
assert.equal(operation.diff_artifact_label, "diff1");
assert.equal(operation.after_sha256, digest(fileArtifact.content));
assert.match(output.patch, /src\/App\.tsx/);

const escapedOutput = invokeBridge({
  task: "design",
  prompt: "Build <stable> UI & keep \"copy\" safe.",
  catalog: 'dig" data-owned="1',
  layout: "dash<script>",
  options: {
    return_patch: true,
  },
});
const escapedContent = escapedOutput.artifact_outputs.find(
  (item) => item.label === "file1",
).content;
assert.match(escapedContent, /data-catalog="dig&quot; data-owned=&quot;1"/);
assert.match(escapedContent, /data-layout="dash&lt;script&gt;"/);
assert.doesNotMatch(escapedContent, /\sdata-owned="/);
assert.doesNotMatch(escapedContent, /<script>/);

const unsafePathOutput = invokeBridge({
  task: "design",
  prompt: "Build from unsafe context path.",
  context_files: [
    {
      path: "../outside/App.tsx",
      content: "export default function Unsafe() {}\n",
    },
  ],
  options: {
    return_patch: true,
  },
});
assert.equal(unsafePathOutput.apply_plan.operations[0].path, "src/App.tsx");
assert.equal(unsafePathOutput.apply_plan.operations[0].expected_sha256, digest(""));

const validContextOutput = invokeBridge({
  task: "design",
  prompt: "Build from existing context path.",
  context_files: [
    {
      path: "app//Dashboard.tsx",
      content: "export default function Old() { return null; }\n",
    },
  ],
  options: {
    return_patch: true,
  },
});
assert.equal(validContextOutput.apply_plan.operations[0].path, "app/Dashboard.tsx");
assert.equal(
  validContextOutput.apply_plan.operations[0].expected_sha256,
  digest("export default function Old() { return null; }\n"),
);

function digest(value) {
  return `sha256:${crypto.createHash("sha256").update(value).digest("hex")}`;
}

function invokeBridge(input) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "dig-ui-bridge-"));
  const inputPath = path.join(tmpDir, "input.json");
  const outputPath = path.join(tmpDir, "output.json");
  fs.writeFileSync(inputPath, `${JSON.stringify(input, null, 2)}\n`, "utf8");

  const result = spawnSync(
    process.execPath,
    [cliPath, "run", "--input-json", inputPath, "--output-json", outputPath],
    {
      cwd: repoRoot,
      encoding: "utf8",
    },
  );

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(fs.existsSync(outputPath), true);
  return JSON.parse(fs.readFileSync(outputPath, "utf8"));
}
