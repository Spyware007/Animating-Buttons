import React, { useEffect, useState, useCallback } from "react";
import classes from "./RepoInfo.module.css";
import { motion } from "framer-motion";
import { imgAnim } from "../../Animation/motion";
import { Star, Fork, Contributors } from "../../../assets/svg";
import { getRepoStats, refreshRepoStats } from "../../../Server/repoStats";

const RepoInfo = () => {
  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
    contributors: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [fromCache, setFromCache] = useState(false);

  const fetchRepoInfo = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      let result;
      if (forceRefresh) {
        result = await refreshRepoStats();
      } else {
        result = await getRepoStats();
      }

      if (result.error) {
        throw new Error(result.error);
      }

      setStats({
        stars: result.stars,
        forks: result.forks,
        contributors: result.contributors
      });

      setLastUpdated(result.lastUpdated);
      setFromCache(result.fromCache);

      if (result.stale) {
        setError("Using cached data (may be outdated)");
      }

    } catch (error) {
      console.error("Error fetching repository information:", error);
      setError(error.message || "Failed to fetch repository information");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepoInfo();
  }, [fetchRepoInfo]);

  if (loading) {
    return (
      <div className={classes.repo_info}>
        <div className={classes.repo_info_row1}>
          <div className={`${classes.repo_info_container} ${classes.loading}`}>
            <Star />
            Stars
            <span className={classes.counter}>...</span>
          </div>
          <div className={`${classes.repo_info_container} ${classes.loading}`}>
            <Fork />
            Forks
            <span className={classes.counter}>...</span>
          </div>
        </div>
        <div className={`${classes.repo_info_container} ${classes.loading}`}>
          <Contributors />
          Contributors
          <span className={classes.counter}>...</span>
        </div>
      </div>
    );
  }

  if (error && !fromCache) {
    return (
      <div className={classes.repo_info}>
        <div className={`${classes.repo_info_container} ${classes.error}`}>
          <span>⚠️ Unable to load repository stats</span>
          <button 
            onClick={() => fetchRepoInfo(true)} 
            className={classes.retry_button}
          >
            Force Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={classes.repo_info}>
        {error && fromCache && (
          <div className={classes.cache_warning}>
            <span>⚠️ {error}</span>
            <button 
              onClick={() => fetchRepoInfo(true)} 
              className={classes.refresh_small_button}
            >
              Refresh
            </button>
          </div>
        )}
        <div className={classes.repo_info_row1}>
          <motion.div
            variants={imgAnim}
            initial="hidden"
            whileInView={{
              scale: [0.9, 1],
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={classes.repo_info_container}
            title={fromCache ? `Cached data (updated: ${lastUpdated ? (lastUpdated.toMillis ? lastUpdated.toDate().toLocaleDateString() : new Date(lastUpdated).toLocaleDateString()) : 'Unknown'})` : 'Live data'}
          >
            <Star />
            Stars
            <span className={classes.counter}>{stats.stars.toLocaleString()}</span>
          </motion.div>
          <motion.div
            variants={imgAnim}
            initial="hidden"
            whileInView={{
              scale: [0.9, 1],
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className={classes.repo_info_container}
            title={fromCache ? `Cached data (updated: ${lastUpdated ? (lastUpdated.toMillis ? lastUpdated.toDate().toLocaleDateString() : new Date(lastUpdated).toLocaleDateString()) : 'Unknown'})` : 'Live data'}
          >
            <Fork />
            Forks
            <span className={classes.counter}>{stats.forks.toLocaleString()}</span>
          </motion.div>
        </div>
        <motion.div
          variants={imgAnim}
          initial="hidden"
          whileInView={{
            scale: [0.9, 1],
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className={classes.repo_info_container}
          title={fromCache ? `Cached data (updated: ${lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'Unknown'})` : 'Live data'}
        >
          <Contributors />
          Contributors
          <span className={classes.counter}>{stats.contributors.toLocaleString()}</span>
        </motion.div>
        {fromCache && (
          <div className={classes.cache_indicator}>
            <span>📋 Cached ({lastUpdated ? (lastUpdated.toMillis ? lastUpdated.toDate().toLocaleDateString() : new Date(lastUpdated).toLocaleDateString()) : 'Unknown'})</span>
          </div>
        )}
      </div>
    </>
  );
};

export default RepoInfo;
