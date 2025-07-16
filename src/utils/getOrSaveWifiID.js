export const generateWifiId = (ip) => {
  return `wifi-${ip}`;
};

export const saveWifiIdToLocalStorage = (ip) => {
  const wifiId = generateWifiId(ip);
  const prev = JSON.parse(localStorage.getItem("wifiMap") || "{}");

  if (!prev[wifiId]) {
    prev[wifiId] = ip;
    localStorage.setItem("wifiMap", JSON.stringify(prev));
    console.log(`[wifiMap 저장] ${wifiId}: ${ip}`);
  }

  localStorage.setItem("wifiId", wifiId);
};

export const getCurrentWifiId = () => {
  return localStorage.getItem("wifiId");
};

export const getWifiMap = () => {
  return JSON.parse(localStorage.getItem("wifiMap") || "{}");
};
