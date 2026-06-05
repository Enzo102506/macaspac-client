const mongoose = require('mongoose');

const connectDB = async () => {
  // Connect MongoDB using MONGO_URI from environment
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('\nMongoDB connection error:');
    console.error(error && error.stack ? error.stack : error);

    // Provide actionable hints for common failures
    const msg = (error && error.message) ? error.message : '';
    if (msg.includes('querySrv') || msg.includes('ECONNREFUSED') || msg.includes('ENOTFOUND')) {
      console.error('\nHint: DNS SRV lookup failed for your Atlas host. Common fixes:');
      console.error('- Ensure your Atlas cluster hostname in `MONGO_URI` is correct.');
      console.error('- Whitelist your IP in Atlas > Network Access (add Current IP or 0.0.0.0/0 for testing).');
      console.error('- Your network may block SRV DNS lookups; try the non-SRV connection string from Atlas (Connect -> Drivers -> toggle off SRV).');
      console.error('- Verify the Atlas DB user and password in Database Access are correct.');
      console.error('- Try connecting with mongosh or Compass using the same URI to isolate the issue.');
    }

    // Exit with a non-zero code so hosting platforms see failure
    process.exit(1);
  }
};

module.exports = connectDB;
