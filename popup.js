document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("phishingResult", ({ phishingResult }) => {
    if (!phishingResult) {
      document.getElementById("results").innerText = "No email scanned yet";
      return;
    }

    const { textAnalysis, urlScores } = phishingResult;
    
    let html = `<p><strong>Text Score:</strong> ${textAnalysis.score}</p>`;
    if (urlScores.length > 0) {
      html += "<h4>URL Phishing Scores:</h4><ul>";
      urlScores.forEach(u => {
        html += `<li>${u.url} → ${u.score}</li>`;
      });
      html += "</ul>";
    }

    document.getElementById("results").innerHTML = html;
  });
});
