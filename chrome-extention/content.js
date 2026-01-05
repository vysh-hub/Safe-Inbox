console.log("content.js loaded");

chrome.runtime.sendMessage({ type: "PING" });

let lastEmailHash = "";

function extractUrls(text) {
  return Array.from(text.matchAll(/https?:\/\/[^\s]+/g)).map(m => m[0]);
}

const observer = new MutationObserver(() => {
  const bodyEl = document.querySelector("div.a3s");
  const subjectEl = document.querySelector("h2[data-thread-perm-id]");

  if (!bodyEl || !subjectEl) return;

  const subject = subjectEl.innerText.trim();
  const body = bodyEl.innerText.trim();

  if (!subject || body.length < 100) return;

  const emailHash = subject + body.slice(0, 200);
  if (emailHash === lastEmailHash) return;

  lastEmailHash = emailHash;

  const urls = extractUrls(body);

  console.log("Opened email detected");
  console.log("Subject:", subject);
  console.log("URLs:", urls);

  chrome.runtime.sendMessage({
    type: "SCAN_EMAIL",
    subject,
    body,
    urls
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
