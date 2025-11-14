// src/hooks/useUsageLimit.js
import { useState, useEffect } from "react";

export const useUsageLimit = (toolKey, limit = 8, windowHours = 24) => {
  const [usageCount, setUsageCount] = useState(0);
  const [isLimited, setIsLimited] = useState(false);

  const STORAGE_KEY = "usageHistory";

  // Load usage history for this tool
  const getHistory = () => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return data[toolKey] || [];
  };

  const saveHistory = (newHistory) => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    data[toolKey] = newHistory;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // Clean timestamps older than 24hr (rolling window)
  const cleanOld = () => {
    const history = getHistory();
    const now = Date.now();
    const cutoff = now - windowHours * 60 * 60 * 1000;

    const filtered = history.filter(ts => ts > cutoff);
    if (filtered.length !== history.length) saveHistory(filtered);

    return filtered;
  };

  useEffect(() => {
    const filtered = cleanOld();
    setUsageCount(filtered.length);
    setIsLimited(filtered.length >= limit);
  }, [toolKey, limit, windowHours]);

  const incrementUsage = () => {
    const history = cleanOld();

    if (history.length >= limit) {
      setIsLimited(true);
      return false;
    }

    const now = Date.now();
    const newHistory = [...history, now];
    saveHistory(newHistory);

    setUsageCount(newHistory.length);
    if (newHistory.length >= limit) setIsLimited(true);

    return true;
  };

  return {
    usageCount,
    limit,
    isLimited,
    incrementUsage,
  };
};
