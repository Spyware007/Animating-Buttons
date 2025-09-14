import { db } from '../firebase/auth';
import { collection, getDocs, doc, updateDoc, writeBatch } from 'firebase/firestore';

export const migrateExistingButtons = async () => {
  try {
    console.log('Starting button migration...');
    
    // Get all buttons without filtering
    const buttonsRef = collection(db, 'buttons');
    const snapshot = await getDocs(buttonsRef);
    
    if (snapshot.empty) {
      console.log('No buttons found to migrate');
      return;
    }

    const batch = writeBatch(db);
    let updateCount = 0;

    snapshot.docs.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      
      // Only update if status field doesn't exist
      if (!data.hasOwnProperty('status')) {
        const docRef = doc(db, 'buttons', docSnapshot.id);
        batch.update(docRef, {
          status: 'approved', // Set existing buttons as approved
          updatedAt: new Date(),
          // Add createdAt if it doesn't exist
          ...((!data.createdAt) && { createdAt: new Date() })
        });
        updateCount++;
      }
    });

    if (updateCount > 0) {
      await batch.commit();
      console.log(`Successfully migrated ${updateCount} buttons to approved status`);
      return updateCount;
    } else {
      console.log('All buttons already have status field');
      return 0;
    }
    
  } catch (error) {
    console.error('Error migrating buttons:', error);
    throw error;
  }
};

// Alternative: Update buttons in smaller batches if you have many buttons
export const migrateButtonsInBatches = async (batchSize = 500) => {
  try {
    console.log('Starting batch migration...');
    
    const buttonsRef = collection(db, 'buttons');
    const snapshot = await getDocs(buttonsRef);
    
    if (snapshot.empty) {
      console.log('No buttons found to migrate');
      return;
    }

    const docs = snapshot.docs.filter(doc => !doc.data().hasOwnProperty('status'));
    const totalDocs = docs.length;
    
    if (totalDocs === 0) {
      console.log('All buttons already migrated');
      return 0;
    }

    console.log(`Found ${totalDocs} buttons to migrate`);

    let processed = 0;
    
    for (let i = 0; i < docs.length; i += batchSize) {
      const batch = writeBatch(db);
      const batchDocs = docs.slice(i, i + batchSize);
      
      batchDocs.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        const docRef = doc(db, 'buttons', docSnapshot.id);
        
        batch.update(docRef, {
          status: 'approved',
          updatedAt: new Date(),
          ...((!data.createdAt) && { createdAt: new Date() })
        });
      });
      
      await batch.commit();
      processed += batchDocs.length;
      console.log(`Migrated batch ${Math.ceil((i + 1) / batchSize)}: ${processed}/${totalDocs} buttons`);
    }

    console.log(`Migration complete! Updated ${processed} buttons`);
    return processed;
    
  } catch (error) {
    console.error('Error in batch migration:', error);
    throw error;
  }
};