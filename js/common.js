/* VECCTAPIVOT GATEWAY — shared runtime (footer injection, reveal-on-scroll, helpers) */
(function () {
  "use strict";

  function footer() {
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
      + '<a class="chan wa" href="https://wa.me/254788099685"><span class="ci ci-wa">W</span><span class="ctxt"><strong>WhatsApp</strong><span>+254 788 099 685</span></span></a>'
      + '<a class="chan" href="tel:+254788099685"><span class="ci ci-call">C</span><span class="ctxt"><strong>Call</strong><span>+254 788 099 685</span></span></a>'
      + '<a class="chan" href="sms:+254788099685"><span class="ci ci-sms">S</span><span class="ctxt"><strong>SMS</strong><span>+254 788 099 685</span></span></a>'
      + '<a class="chan mail" href="mailto:vecctapivotenterprises@gmail.com"><span class="ci ci-mail">✉</span><span class="ctxt"><strong>Email</strong><span>vecctapivotenterprises@gmail.com</span></span></a>'
      + '</div>';

    el.innerHTML =
      '<div class="guarantees">' + guarantees + '</div>'
      + '<div class="footcta">'
      + '<div><h3>One pivot, endless possibilities &mdash; starting with yours.</h3><p>Message the desk on WhatsApp with the service you read here &mdash; scoping is free, and a named officer replies with a fixed quote before anything begins, wherever you trade.</p></div>'
      + '<div class="btns"><a class="btn gold" href="https://wa.me/254788099685">Start on WhatsApp</a><a class="btn line" href="ticket.html">Book a Ticket</a></div>'
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
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }

  function params() {
    return new URLSearchParams(location.search);
  }

  function fmtDate(iso) {
    try { return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }); }
    catch (e) { return iso; }
  }

  window.VP = { footer: footer, reveal: reveal, params: params, fmtDate: fmtDate };
  footer();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", reveal);
  } else {
    reveal();
  }
})();
