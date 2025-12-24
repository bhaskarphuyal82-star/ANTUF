// Drop text index from articles collection
const mongoose = require('mongoose');
require('dotenv').config();

async function dropTextIndex() {
  try {
    console.log('Connecting to MongoDB...');
    const dbUri = process.env.MONGODB_URI;
    
    if (!dbUri) {
      console.error('MONGODB_URI not found in environment variables');
      process.exit(1);
    }

    await mongoose.connect(dbUri);
    console.log('✅ Connected successfully');

    const db = mongoose.connection.db;
    const collection = db.collection('articles');

    // Get all indexes
    console.log('\n📋 Current indexes:');
    const indexes = await collection.indexes();
    indexes.forEach(idx => {
      console.log(`  - ${idx.name}`);
    });

    // Drop all text indexes
    let dropped = 0;
    for (const index of indexes) {
      if (index.key && Object.values(index.key).includes('text')) {
        console.log(`\n🗑️  Dropping text index: ${index.name}`);
        try {
          await collection.dropIndex(index.name);
          console.log(`✅ Dropped: ${index.name}`);
          dropped++;
        } catch (err) {
          console.error(`❌ Error dropping ${index.name}:`, err.message);
        }
      }
    }

    if (dropped === 0) {
      console.log('\n⚠️  No text indexes found to drop');
    } else {
      console.log(`\n✅ Successfully dropped ${dropped} text index(es)`);
      console.log('📝 Restart your application - the new text index will be created automatically');
    }
    
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

dropTextIndex();
