function getRisk(score) {
  if (score >= 0.7) return { label: "🔴 Phishing", class: "phishing" };
  if (score >= 0.3) return { label: "🟡 Suspicious", class: "suspicious" };
  return { label: "🟢 Safe", class: "safe" };
}

chrome.storage.local.get("phishingResult", res => {
  if (!res.phishingResult) {
    document.getElementById("risk-label").innerText = "No scan data";
    return;
  }

  const { textAnalysis, urlScores } = res.phishingResult;

  const emailScore = textAnalysis?.phishing_prob ?? 0;
  const maxUrlScore = Math.max(
    0,
    ...urlScores.map(u => u.score)
  );

  const finalScore = Math.max(emailScore, maxUrlScore);
  const risk = getRisk(finalScore);

  const overall = document.getElementById("overall");
  overall.classList.add(risk.class);

  document.getElementById("risk-label").innerText = risk.label;
  document.getElementById("risk-score").innerText =
    `(${Math.round(finalScore * 100)}%)`;

  document.getElementById("email-score").innerText =
    `${Math.round(emailScore * 100)}% phishing likelihood`;

  const urlList = document.getElementById("url-list");

  if (urlScores.length === 0) {
    urlList.innerHTML = "<li>No URLs found</li>";
  } else {
    urlScores.forEach(u => {
      const li = document.createElement("li");
      li.innerText = `${u.url} → ${Math.round(u.score * 100)}%`;
      urlList.appendChild(li);
    });
  }
});
