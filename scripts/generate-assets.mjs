import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const force = process.argv.includes("--force");
const env = await loadEnv();
const apiKey = env.RIZQUNA_API_KEY;
const baseUrl = env.RIZQUNA_BASE_URL || "https://router.rizquna.id/v1";
const endpoint = env.RIZQUNA_IMAGE_ENDPOINT || "/images/generations";
const model = env.RIZQUNA_IMAGE_MODEL;
const defaultSize = env.RIZQUNA_IMAGE_SIZE || "1024x1024";
const responseFormat = env.RIZQUNA_RESPONSE_FORMAT || "b64_json";

if (!apiKey) throw new Error("RIZQUNA_API_KEY missing in .env.local");
if (!model) throw new Error("RIZQUNA_IMAGE_MODEL missing in .env.local");

const prompts = JSON.parse(await readFile("scripts/image-prompts.json", "utf8"));

for (const item of prompts) {
  const output = resolve(item.output);
  if (!force && existsSync(output)) {
    console.log(`skip ${item.output}`);
    continue;
  }

  await mkdir(dirname(output), { recursive: true });
  console.log(`generate ${item.id}`);

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt: item.prompt,
      size: item.size || defaultSize,
      n: 1,
      response_format: responseFormat,
    }),
  });

  if (!response.ok) throw new Error(`${item.id} request failed: ${response.status} ${await response.text()}`);

  const data = await response.json();
  const image = data?.data?.[0];

  if (image?.b64_json) {
    await writeFile(output, Buffer.from(image.b64_json, "base64"));
    continue;
  }

  if (image?.url) {
    const imageResponse = await fetch(image.url);
    if (!imageResponse.ok) throw new Error(`${item.id} image download failed: ${imageResponse.status}`);
    await writeFile(output, Buffer.from(await imageResponse.arrayBuffer()));
    continue;
  }

  throw new Error(`${item.id} response does not contain data[0].b64_json or data[0].url`);
}

async function loadEnv() {
  const result = { ...process.env };
  if (!existsSync(".env.local")) return result;

  const content = await readFile(".env.local", "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^"|"$/g, "");
    result[key] = value;
  }
  return result;
}
