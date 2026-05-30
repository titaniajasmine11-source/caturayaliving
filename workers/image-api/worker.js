const worker = {
  async fetch(request, env) {
    const apiKey = env.API_KEY;
    const url = new URL(request.url);
    const auth = request.headers.get("Authorization");

    if (!apiKey || auth !== `Bearer ${apiKey}`) {
      return json({ error: "Unauthorized" }, 401);
    }

    if (request.method !== "POST" || url.pathname !== "/") {
      return json({ error: "Not allowed" }, 405);
    }

    try {
      const { prompt } = await request.json();

      if (!prompt || typeof prompt !== "string") {
        return json({ error: "Prompt is required" }, 400);
      }

      const result = await env.AI.run("@cf/stabilityai/stable-diffusion-xl-base-1.0", {
        prompt: prompt.slice(0, 1000),
      });

      return new Response(result, {
        headers: { "Content-Type": "image/jpeg" },
      });
    } catch (error) {
      return json({ error: "Failed to generate image", details: error instanceof Error ? error.message : "Unknown error" }, 500);
    }
  },
};

export default worker;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
