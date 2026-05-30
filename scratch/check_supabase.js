const url = "https://ddfweujqtqjxdvznauvu.supabase.co/rest/v1/cms_items?select=type,title,slug,body";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkZndldWpxdHFqeGR2em5hdXZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTk5NDAzNywiZXhwIjoyMDk1NTcwMDM3fQ.EXriK4s0cPA-b5rRtvLk7h6rYHqbwkNNkCcCdAJpIM8";

fetch(url, {
  headers: {
    "apikey": key,
    "authorization": `Bearer ${key}`
  }
})
.then(res => res.json())
.then(data => {
  console.log("=== CMS ITEMS FROM SUPABASE ===");
  data.forEach(item => {
    let image = "No image field";
    if (item.body && typeof item.body === "object") {
      if (item.body.image) {
        image = item.body.image;
      }
    }
    console.log(`[${item.type}] Title: "${item.title}" | Slug: "${item.slug}" | Image: "${image}"`);
  });
})
.catch(err => console.error(err));
