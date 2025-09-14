import React, { useState } from 'react';
import { migrateExistingButtons } from '../../utils/migrateButtons';
import { toast } from 'react-hot-toast';

const MigrationButton = () => {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrated, setMigrated] = useState(false);

  const handleMigration = async () => {
    if (migrated) {
      toast.info('Migration already completed!');
      return;
    }

    const confirmed = window.confirm(
      'This will update all existing buttons to have "approved" status. Are you sure you want to proceed?'
    );
    
    if (!confirmed) return;

    try {
      setIsMigrating(true);
      const updateCount = await migrateExistingButtons();
      
      if (updateCount > 0) {
        toast.success(`Successfully migrated ${updateCount} buttons!`);
        setMigrated(true);
        
        // Suggest page reload
        setTimeout(() => {
          const reload = window.confirm('Migration complete! Reload the page to see the updated buttons?');
          if (reload) {
            window.location.reload();
          }
        }, 2000);
      } else {
        toast.info('All buttons already have status field');
        setMigrated(true);
      }
      
    } catch (error) {
      console.error('Migration failed:', error);
      toast.error('Migration failed. Please try again or check the console for details.');
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      background: '#ff6b6b',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
        🔄 Database Migration Required
      </div>
      <button
        onClick={handleMigration}
        disabled={isMigrating || migrated}
        style={{
          background: migrated ? '#28a745' : '#fff',
          color: migrated ? '#fff' : '#ff6b6b',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: isMigrating ? 'not-allowed' : 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        {isMigrating ? 'Migrating...' : migrated ? '✓ Migrated' : 'Migrate Buttons'}
      </button>
      {migrated && (
        <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.9 }}>
          You can now remove this button from App.jsx
        </div>
      )}
    </div>
  );
};

export default MigrationButton;