chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(" Background received:", msg);

  if (msg.type === "PING") {
    sendResponse({ reply: "pong" });
    return true;
  }

  if (msg.type === "SCAN_EMAIL") {
    handleScanEmail(msg)
      .then(result => {
        sendResponse({ success: true, result });
      })
      .catch(err => {
        console.error(" Scan failed:", err);
        sendResponse({ success: false, error: err.message });
      });

    return true;
  }
});

async function handleScanEmail(msg) {
  const { subject, body, urls } = msg;

  const textResponse = await fetch(
    "http://127.0.0.1:8000/predict-body",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body })
    }
  ).then(res => res.json());

  let urlResults = [];

  for (const url of urls) {
    const res = await fetch(
      "http://127.0.0.1:8000/predict-url",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      }
    ).then(r => r.json());

    urlResults.push({
      url,
      Phishing: res.phishing_prob,
      legit: res.legit_prob
    });
  }

  const finalResult = {
    textAnalysis: textResponse,
    urlScores: urlResults
  };

  chrome.storage.local.set({ phishingResult: finalResult });

  console.log(" Phishing analysis stored:", finalResult);

  return finalResult;
}
