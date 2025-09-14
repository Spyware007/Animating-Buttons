import React from 'react';
import classes from './Skeleton.module.css';

const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = '',
  variant = 'rectangular' // 'rectangular', 'circular', 'text'
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'circular':
        return classes.circular;
      case 'text':
        return classes.text;
      default:
        return classes.rectangular;
    }
  };

  return (
    <div
      className={`${classes.skeleton} ${getVariantClass()} ${className}`}
      style={{
        width,
        height,
        borderRadius: variant === 'circular' ? '50%' : borderRadius,
      }}
    />
  );
};

// Card skeleton component
export const CardSkeleton = () => {
  return (
    <div className={classes.card_skeleton}>
      <div className={classes.frame_skeleton}>
        <Skeleton height="280px" borderRadius="20px" />
      </div>
      
      <div className={classes.contributor_skeleton}>
        <div className={classes.profile_section}>
          <Skeleton variant="circular" width="40px" height="40px" />
          <Skeleton width="120px" height="16px" />
        </div>
        
        <div className={classes.buttons_skeleton}>
          <Skeleton width="60px" height="32px" borderRadius="8px" />
          <Skeleton width="60px" height="32px" borderRadius="8px" />
        </div>
      </div>
      
      <div className={classes.stats_skeleton}>
        <Skeleton variant="circular" width="24px" height="24px" />
        <Skeleton variant="circular" width="24px" height="24px" />
        <Skeleton variant="circular" width="24px" height="24px" />
      </div>
    </div>
  );
};

// Grid of card skeletons
export const CardGridSkeleton = ({ count = 9 }) => {
  return (
    <div className={classes.grid_skeleton}>
      {Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
};

// Text skeleton with multiple lines
export const TextSkeleton = ({ lines = 3, className = '' }) => {
  return (
    <div className={`${classes.text_skeleton} ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '70%' : '100%'}
          height="16px"
        />
      ))}
    </div>
  );
};

export default Skeleton;