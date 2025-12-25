/* faq-app.js
   External JS to load `faqs.json` and render the FAQ accordion.
   Expects an HTML container with id="faqAccordion" and Bootstrap collapse available.
*/

(function () {
  "use strict";

  function escapeHtml(s) {
    if (!s) return "";
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/\n/g, "<br>");
  }

  function createFaqCard(item, idx) {
    const qId = `heading-${idx}`;
    const collapseId = `collapse-${idx}`;

    return `\n  <div class="card faq-item mb-2" itemscope itemprop="mainEntity" itemtype="https://saydao.org/Question">\n    <div class="card-header" id="${qId}">\n      <h5 class="mb-0">\n        <button class="btn btn-link collapsed text-right" type="button" data-toggle="collapse"\n          data-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}" itemprop="name">${escapeHtml(
      item.question
    )}</button>\n      </h5>\n    </div>\n    <div id="${collapseId}" class="collapse" aria-labelledby="${qId}" data-parent="#faqAccordion">\n      <div class="card-body" itemscope itemprop="acceptedAnswer" itemtype="https://saydao.org/Answer">\n        <div itemprop="text">${escapeHtml(
      item.answer
    )}</div>\n      </div>\n    </div>\n  </div>`;
  }

  function renderAll(faqs) {
    const container = document.getElementById("faqAccordion");
    if (!container) return;
    container.innerHTML = "";
    faqs.forEach((f, i) => {
      container.insertAdjacentHTML("beforeend", createFaqCard(f, i));
    });
  }

  function loadFaqs() {
    fetch("js/Json/faq/faqs.json", { cache: "no-store" })
      .then((resp) => {
        if (!resp.ok) throw new Error("no external json");
        return resp.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0)
          throw new Error("invalid data");
        renderAll(data);
      })
      .catch(() => {
        // If fetch fails, try to read embedded JSON from a global `FALLBACK_FAQS` variable
        if (window.FALLBACK_FAQS && Array.isArray(window.FALLBACK_FAQS)) {
          renderAll(window.FALLBACK_FAQS);
        } else {
          console.warn(
            "Unable to load faqs.json and no FALLBACK_FAQS provided."
          );
        }
      });
  }

  document.addEventListener("DOMContentLoaded", loadFaqs);
})();
