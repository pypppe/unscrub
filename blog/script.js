
console.log("script.js: running. location.pathname =", window.location.pathname);

const candidates = [
  "/blog/blogs.json",
  "/blog/blogs.json?cachebuster=" + Date.now(),
  "blogs.json",
  "./blogs.json",
  "/blogs.json"
];

async function tryLoad() {
  const container = document.getElementById("blog-container");
  if (!container) {
    console.error("script.js: no #blog-container element found.");
    return;
  }

  let lastError = null;
  for (const path of candidates) {
    try {
      console.log("script.js: trying", path);
      const res = await fetch(path, { cache: "no-store" });
      console.log("script.js: response for", path, res.status, res.ok);
      if (!res.ok) {
        lastError = new Error(`fetch ${path} responded ${res.status}`);
        continue;
      }
      const text = await res.text();
      if (text.trim().startsWith("<")) {
        lastError = new Error(`fetch ${path} returned HTML (probably a 404 page)`);
        console.warn("script.js: likely not json; response preview:", text.slice(0,200));
        continue;
      }
      const blogs = JSON.parse(text);
      console.log("script.js: parsed blogs:", blogs);

      blogs.sort((a,b)=> new Date(b.date) - new Date(a.date));
      container.innerHTML = "";
      blogs.forEach(blog => {
        const article = document.createElement("article");
        article.className = "blog-post";
        article.innerHTML = `
          <h2>${escapeHtml(blog.title)}</h2>
          <p class="meta">${escapeHtml(blog.author)} • ${new Date(blog.date).toLocaleDateString()}</p>
          <p>${escapeHtml(blog.content)}</p>
          <hr>
        `;
        container.appendChild(article);
      });

      return;
    } catch (err) {
      console.warn("script.js: error trying", path, err);
      lastError = err;
    }
  }

  console.error("script.js: failed to load blogs.json. lastError:", lastError);
  container.innerHTML = "<p style='color:#f66;'>couldn't load blogs :( check console for details</p>";
}

function escapeHtml(s){
  if(!s) return "";
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

tryLoad();
