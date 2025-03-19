export async function fetchOptionsChain() {
    // Mock API response (Replace with real API URL)
    return [
      { strike: 18000, ivRank: 25, oiChange: 1200, aiSignal: "BUY" },
      { strike: 18200, ivRank: 32, oiChange: -800, aiSignal: "SELL" },
    ];
  }
  