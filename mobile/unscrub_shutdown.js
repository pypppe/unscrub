

(function(){
  if (window.__UNSCRUB_OVERLAY_INSTALLED__) return;
  window.__UNSCRUB_OVERLAY_INSTALLED__ = true;

  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap';
  document.head.appendChild(fontLink);

  var style = document.createElement('style');
  style.type = 'text/css';
  style.textContent = `
    :root{--bg:#0f0f0f;--fg:#e6e6e6;--muted:#bdbdbd;--accent:#7ce7ff}
    .unscrub-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:2147483647; /* max 32-bit int */pointer-events:auto}
    .unscrub-sheet{position:relative;z-index:1;background:transparent;padding:40px;max-width:920px;border-radius:14px;text-align:center;font-family:Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;color:var(--fg);}{background:#0f0f0f;padding:40px;max-width:920px;border-radius:14px;text-align:center;font-family:Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;color:var(--fg);}
    .unscrub-title{font-weight:600;font-size:22px;margin:0 0 12px;line-height:1.25}
    .unscrub-msg{font-weight:300;font-size:18px;margin:0 0 18px;color:var(--muted);max-width:760px}
    .unscrub-link{display:inline-block;font-weight:600;font-size:20px;text-decoration:underline;cursor:pointer;color:var(--accent)}
    /* Make sure overlay covers pointer events for underlying page */
    .unscrub-overlay-backdrop{position:absolute;inset:0;background:#0f0f0f;z-index:0;}
    /* small responsive tweaks */
    @media (max-width:520px){
      .unscrub-sheet{padding:24px}
      .unscrub-title{font-size:18px}
      .unscrub-msg{font-size:16px}
      .unscrub-link{font-size:18px}
    }
  `;
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.className = 'unscrub-overlay';
  overlay.style.touchAction = 'none';

  var backdrop = document.createElement('div');
  backdrop.className = 'unscrub-overlay-backdrop';
  overlay.appendChild(backdrop);

  var sheet = document.createElement('div');
  sheet.className = 'unscrub-sheet';

  var title = document.createElement('h1');
  title.className = 'unscrub-title';
  title.textContent = 'Unscrub — Notification';

  var msg = document.createElement('p');
  msg.className = 'unscrub-msg';
  msg.textContent = "Unscrub has shut down, download Emojiscrub for free.";

  var link = document.createElement('a');
  link.className = 'unscrub-link';
  link.textContent = 'Emojiscrub';
  link.href = 'https://www.mediafire.com/file/ps1uxim88pubumz/emojiscrub.apk/file';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  sheet.appendChild(title);
  sheet.appendChild(msg);
  sheet.appendChild(link);
  overlay.appendChild(sheet);
  document.documentElement.appendChild(overlay);

  var originalOverflow = document.documentElement.style.overflow || document.body.style.overflow || '';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  window.__UNSCRUB_OVERLAY = {
    remove: function(){
      try{ document.documentElement.removeChild(overlay); }catch(e){}
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.overflow = originalOverflow;
      delete window.__UNSCRUB_OVERLAY_INSTALLED__;
      delete window.__UNSCRUB_OVERLAY;
    },
    overlayElement: overlay
  };

  try{
    overlay.style.zIndex = '2147483647';
  }catch(e){}

})();
