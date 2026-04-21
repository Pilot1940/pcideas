(function () {
  var css = '#pc-share-float{position:fixed;left:max(16px,calc(50% - 460px));top:50%;transform:translateY(-50%);z-index:999;display:flex;flex-direction:column;gap:8px;opacity:0;pointer-events:none;transition:opacity 0.4s;}'
    + '#pc-share-float.pc-share-visible{opacity:1;pointer-events:auto;}'
    + '#pc-share-bottom{display:none;max-width:740px;margin:3em auto 0;padding:0 24px 60px;}'
    + '@media(max-width:960px){#pc-share-float{display:none!important;}#pc-share-bottom{display:block;}}';

  var html =
    '<div id="pc-share-float">' +
      '<a href="#" onclick="window.open(\'https://wa.me/?text=\'+encodeURIComponent(document.title+\' \u2014 \'+window.location.href),\'_blank\');return false;" title="Share on WhatsApp" style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:#25D366;color:#fff;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.15);"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>' +
      '<a href="#" onclick="window.open(\'https://twitter.com/intent/tweet?text=\'+encodeURIComponent(document.title)+\'&url=\'+encodeURIComponent(window.location.href),\'_blank\');return false;" title="Share on X" style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:#000;color:#fff;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.15);"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>' +
      '<a href="#" onclick="window.open(\'https://www.linkedin.com/shareArticle?mini=true&url=\'+encodeURIComponent(window.location.href)+\'&title=\'+encodeURIComponent(document.title),\'_blank\');return false;" title="Share on LinkedIn" style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:#0A66C2;color:#fff;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.15);"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>' +
      '<button id="pc-copy-btn" onclick="pcShareCopy()" title="Copy link" style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:var(--bg-card,#fff);color:var(--text,#1A1A18);border:1px solid var(--border,#E0DED8);cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.10);transition:background 0.2s,color 0.2s,border-color 0.2s;"><svg id="pc-copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg><svg id="pc-copy-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><polyline points="20 6 9 17 4 12"></polyline></svg></button>' +
    '</div>' +
    '<div id="pc-share-bottom">' +
      '<div style="border-top:1px solid var(--border,#E0DED8);padding-top:2em;display:flex;align-items:center;gap:14px;flex-wrap:wrap;">' +
        '<span style="font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-tertiary,#8A8983);">Share</span>' +
        '<div style="display:flex;gap:8px;align-items:center;">' +
          '<a href="#" onclick="window.open(\'https://wa.me/?text=\'+encodeURIComponent(document.title+\' \u2014 \'+window.location.href),\'_blank\');return false;" title="Share on WhatsApp" style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:#25D366;color:#fff;text-decoration:none;flex-shrink:0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>' +
          '<a href="#" onclick="window.open(\'https://twitter.com/intent/tweet?text=\'+encodeURIComponent(document.title)+\'&url=\'+encodeURIComponent(window.location.href),\'_blank\');return false;" title="Share on X" style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:#000;color:#fff;text-decoration:none;flex-shrink:0;"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>' +
          '<a href="#" onclick="window.open(\'https://www.linkedin.com/shareArticle?mini=true&url=\'+encodeURIComponent(window.location.href)+\'&title=\'+encodeURIComponent(document.title),\'_blank\');return false;" title="Share on LinkedIn" style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:#0A66C2;color:#fff;text-decoration:none;flex-shrink:0;"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>' +
          '<button id="pc-copy-btn-m" onclick="pcShareCopy(\'pc-copy-btn-m\',\'pc-copy-icon-m\',\'pc-copy-check-m\')" title="Copy link" style="display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:var(--bg-alt,#F2F0EB);color:var(--text,#1A1A18);border:1px solid var(--border,#E0DED8);cursor:pointer;flex-shrink:0;transition:background 0.2s,color 0.2s,border-color 0.2s;"><svg id="pc-copy-icon-m" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg><svg id="pc-copy-check-m" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><polyline points="20 6 9 17 4 12"></polyline></svg></button>' +
        '</div>' +
      '</div>' +
    '</div>';

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('beforeend', html);
    window.addEventListener('scroll', function () {
      var f = document.getElementById('pc-share-float');
      if (!f) return;
      if (window.scrollY > 300) f.classList.add('pc-share-visible');
      else f.classList.remove('pc-share-visible');
    });
  }

  window.pcShareCopy = function (b, i, c) {
    b = b || 'pc-copy-btn'; i = i || 'pc-copy-icon'; c = c || 'pc-copy-check';
    navigator.clipboard.writeText(window.location.href).then(function () {
      var btn = document.getElementById(b);
      document.getElementById(i).style.display = 'none';
      document.getElementById(c).style.display = 'block';
      btn.style.background = '#3B6D11'; btn.style.color = '#fff'; btn.style.borderColor = '#3B6D11';
      setTimeout(function () {
        document.getElementById(i).style.display = 'block';
        document.getElementById(c).style.display = 'none';
        btn.style.background = ''; btn.style.color = ''; btn.style.borderColor = '';
      }, 2000);
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
