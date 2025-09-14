import { db } from "../firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const REPO_STATS_DOC = "repository-stats";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const getRepoStats = async () => {
  try {
    // Try to get cached data from Firebase first
    const statsDoc = await getDoc(doc(db, "cache", REPO_STATS_DOC));
    
    if (statsDoc.exists()) {
      const data = statsDoc.data();
      const now = Date.now();
      const lastUpdated = data.lastUpdated?.toMillis() || 0;
      
      // Check if cache is still valid (less than 24 hours old)
      if (now - lastUpdated < CACHE_DURATION) {
        return {
          stars: data.stars || 0,
          forks: data.forks || 0,
          contributors: data.contributors || 0,
          lastUpdated: data.lastUpdated,
          fromCache: true
        };
      }
    }

    // Cache is expired or doesn't exist, fetch fresh data
    return await fetchAndCacheRepoStats();
    
  } catch (error) {
    console.error("Error fetching repo stats:", error);
    
    // Try to return stale cache data if available
    const statsDoc = await getDoc(doc(db, "cache", REPO_STATS_DOC));
    if (statsDoc.exists()) {
      const data = statsDoc.data();
      return {
        stars: data.stars || 0,
        forks: data.forks || 0,
        contributors: data.contributors || 0,
        lastUpdated: data.lastUpdated,
        fromCache: true,
        stale: true
      };
    }
    
    // Return fallback data if all else fails
    return {
      stars: 0,
      forks: 0,
      contributors: 0,
      error: error.message
    };
  }
};

const fetchAndCacheRepoStats = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // Fetch main repository data
    const response = await fetch(
      "https://api.github.com/repos/Spyware007/Animating-Buttons",
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded");
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    const stats = {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      contributors: 0 // Will be updated below
    };

    // Fetch contributors count efficiently
    try {
      const contributorsResponse = await fetch(
        `${data.contributors_url}?per_page=1`,
        { signal: controller.signal }
      );

      if (contributorsResponse.ok) {
        const linkHeader = contributorsResponse.headers.get('link');
        if (linkHeader) {
          const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (lastPageMatch) {
            stats.contributors = parseInt(lastPageMatch[1]);
          } else {
            const contributorsData = await contributorsResponse.json();
            stats.contributors = contributorsData.length;
          }
        } else {
          const contributorsData = await contributorsResponse.json();
          stats.contributors = contributorsData.length;
        }
      }
    } catch (contributorsError) {
      console.warn("Could not fetch contributors count:", contributorsError);
      stats.contributors = 0;
    }

    // Cache the fresh data in Firebase
    await setDoc(doc(db, "cache", REPO_STATS_DOC), {
      ...stats,
      lastUpdated: serverTimestamp()
    });

    return {
      ...stats,
      fromCache: false,
      lastUpdated: new Date()
    };

  } catch (error) {
    console.error("Error fetching fresh repo stats:", error);
    throw error;
  }
};

// Admin function to force refresh stats
export const refreshRepoStats = async () => {
  try {
    return await fetchAndCacheRepoStats();
  } catch (error) {
    console.error("Error force refreshing repo stats:", error);
    throw error;
  }
};