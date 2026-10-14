/* VECCTAPIVOT GATEWAY — shared runtime (footer injection, reveal-on-scroll, helpers) */
(function () {
  "use strict";
  function footer() {
    // ====== EDIT CONTACT HERE ONCE — REFLECTS ON LANDING + ALL PAGES ======
    var PHONE_DISPLAY = "+254 768 309 956";
    var PHONE_LINK = "254768309956";
    var EMAIL = "vecctapivotenterprises@gmail.com";
    // =======================================================================
    
    // ====== AUTO-FIX TOP BAR IN PILLARS (solves your 88 099 problem) ======
    try {
      document.querySelectorAll('a[href*="wa.me"]').forEach(function(a){
        a.href = "https://wa.me/" + PHONE_LINK;
        if(a.textContent.includes("WhatsApp")){
          a.textContent = "WhatsApp " + PHONE_DISPLAY;
        }
      });
    } catch(e){}
    // =======================================================================

    var el = document.getElementById("siteFoot");
    if (!el || el.dataset.done) return;
    el.dataset.done = "1";
    var y = new Date().getFullYear();
    var ga = document.getElementById("guaranteeBar");
    var guarantees =
      '<div class="guar"><span class="gi">&#9673;</span><div><strong>One Pivot, Endless Possibilities</strong><span>Sixty-four services through one trusted desk &mdash; registry, academics, transport, sourcing, ground fixers, agency retainers, statutory portals and fabric care, wherever you trade.</span></div></div>'
      + '<div class="guar"><span class="gi">&#10003;</span><div><strong>Transparent Terms</strong><span>Scope, requirements and timeframes stated before you commit. A fixed quote is confirmed with you before any work starts.</span></div></div>'
      + '<div class="guar"><span class="gi">&#9642;</span><div><strong>Tracked to the Handover</strong><span>Every booking carries a unique reference. Follow its status any time on the tracking desk, on WhatsApp or by phone.</span></div></div>'
      + '<div class="guar"><span class="gi">&#8635;</span><div><strong>Aftercare Window</strong><span>If an authority or portal rejects part of the deliverable within 14 days, corrections are filed and pursued at no fresh engagement fee.</span></div></div>';
    if (ga) { ga.innerHTML = guarantees; ga.classList.add("inbar"); }
    var pillars =
      '<a href="digital.html">Digital &amp; Brand Systems</a>'
      + '<a href="academic.html">Academic &amp; Testing Logistics</a>'
      + '<a href="transport.html">Transport Brokerage Hub</a>'
      + '<a href="sourcing.html">Merchandise Sourcing Links</a>'
      + '<a href="fixer.html">Independent Fixer Desk</a>'
      + '<a href="agency.html">General Agency Core</a>'
      + '<a href="statutory.html">Statutory &amp; Portal Logistics</a>'
      + '<a href="laundry.html">Laundry &amp; Fabric Care</a>';
    var gateway =
      '<a href="index.html#services">Explore the Service Index</a>'
      + '<a href="ticket.html">Book a Service Ticket</a>'
      + '<a href="job.html">Request a Job</a>'
      + '<a href="track.html">Track a Reference</a>'
      + '<a href="index.html#faq">Frequently Asked Questions</a>';
    var channels =
      '<div class="chanrow">'
      + '<a class="chan wa" href="https://wa.me/'+PHONE_LINK+'"><span class="ci ci-wa"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2a9.86 9.86 0 0 0-8.5 14.96L2 22l5.18-1.36A9.86 9.86 0 0 0 12.04 22a9.816 9.816 0 0 0 7.01-17.09zM12.04 20.15a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.81.82-2.99-.2-.3A8.1 8.1 0 0 1 4 12.04 8.12 8.12 0 0 1 12.04 3.86 8.12 8.12 0 0 1 20.16 12.04a8.12 8.12 0 0 1-8.12 8.11zm4.45-6.08c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.94-.28.18-.52.06a6.57 6.57 0 0 1-1.93-1.19 7.25 7.25 0 0 1-1.34-1.67c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42s.16-.24.24-.4a.8.8 0 0 0 .04-.38c-.02-.12-.54-1.3-.74-1.78-.2-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2 .86 2.32.98 2.48.69 1.65 1.88 2.4a7.64 7.64 0 0 0 2.94 1.15c.41.06.77.05 1.06.03.32-.03.99-.4 1.13-.79.14-.39.14-.72.1-.79-.04-.07-.2-.11-.44-.23z"/></svg></span><span class="ctxt"><strong>WhatsApp</strong><span>'+PHONE_DISPLAY+'</span></span></a>'
      + '<a class="chan" href="tel:+'+PHONE_LINK+'"><span class="ci ci-call"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></span><span class="ctxt"><strong>Call</strong><span>'+PHONE_DISPLAY+'</span></span></a>'
      + '<a class="chan" href="sms:+'+PHONE_LINK+'"><span class="ci ci-sms"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6l4 4 4-4h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 8H6v-2h12v2zm0-4H6V4h12v2z"/></svg></span><span class="ctxt"><strong>SMS</strong><span>'+PHONE_DISPLAY+'</span></span></a>'
      + '<a class="chan mail" href="mailto:'+EMAIL+'"><span class="ci ci-mail"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg></span><span class="ctxt"><strong>Email</strong><span>'+EMAIL+'</span></span></a>'
      + '</div>';
    el.innerHTML =
      '<div class="guarantees">' + guarantees + '</div>'
      + '<div class="footcta">'
      + '<div><h3>One pivot, endless possibilities &mdash; starting with yours.</h3><p>Message the desk on WhatsApp with the service you read here &mdash; scoping is free, and a named officer replies with a fixed quote before anything begins, wherever you trade.</p></div>'
      + '<div class="btns"><a class="btn gold" href="https://wa.me/'+PHONE_LINK+'">Start on WhatsApp</a><a class="btn line" href="ticket.html">Book a Ticket</a></div>'
      + '</div>'
      + '<div class="footgrid">'
      + '<div class="fcol brand">'
      + '<img src="logo.png" alt="Vecctapivot Enterprises logo" width="46" height="46">'
      + '<div><strong>VECCTAPIVOT ENTERPRISES</strong><span>One Pivot &middot; Endless Possibilities &middot; Unified Cross-Border Service Architecture &middot; 64 services</span><span class="cred" style="display:flex!important;flex-direction:column!important;gap:8px!important;align-items:flex-start!important;background:transparent!important;border:none!important;outline:none!important;box-shadow:none!important;padding:0!important;border-radius:0!important;margin:0!important;"><span class="ubadge" style="background:#FFDB8A!important;color:#1e293b!important;border:1px solid #FFDB8A!important;border-radius:999px!important;font-weight:800!important;padding:6px 14px!important;display:inline-block!important;box-shadow:none!important;">BRS BN-AYSO8LRE</span><span class="ubadge" onclick="navigator.clipboard.writeText(\'1741514\');this.innerText=\'Copied!\';setTimeout(()=>this.innerText=\'Buy Goods Till No: 1741514\',1500)" style="cursor:pointer;background:#FFDB8A!important;color:#1e293b!important;border:1px solid #FFDB8A!important;border-radius:999px!important;font-weight:800!important;padding:6px 14px!important;display:inline-block!important;box-shadow:none!important;" title="Tap to copy Till">Buy Goods Till No: 1741514</span></span></div>'
      + '</div>'
      + '<div class="fcol"><h4>Service Pillars</h4>' + pillars + '</div>'
      + '<div class="fcol"><h4>Gateway</h4>' + gateway + '</div>'
      + '<div class="fcol"><h4>Talk to the Desk</h4>' + channels + '</div>'
      + '</div>'
      + '<div class="fbase">'
      + '<span>VECCTAPIVOT ENTERPRISES &copy; ' + y + ' &middot; One Pivot, Endless Possibilities</span>'
      + '<span>Sixty-four services, one desk, one reference &middot; replies on WhatsApp, call, SMS and email</span>'
      + '</div>';
  }
  function reveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }
  function params() { return new URLSearchParams(location.search); }
  function fmtDate(iso) { try { return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }); } catch (e) { return iso; } }
  window.VP = { footer: footer, reveal: reveal, params: params, fmtDate: fmtDate };
  footer();
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", reveal); } else { reveal(); }
})();
