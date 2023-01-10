
// export async function connectToCluster() {
//    let mongoClient;
//    const {MongoClient} = require('mongodb');
//    try {
//     const uri='mongodb://subhashis:f4glYygzbPIY4QEs@ac-6axwfs8-shard-00-00.orrhpdt.mongodb.net:27017,ac-6axwfs8-shard-00-01.orrhpdt.mongodb.net:27017,ac-6axwfs8-shard-00-02.orrhpdt.mongodb.net:27017/?ssl=true&replicaSet=atlas-13nlg9-shard-0&authSource=admin&retryWrites=true&w=majority'
//        mongoClient = new MongoClient(uri);
//        console.log('Connecting to MongoDB Atlas cluster...');
//        await mongoClient.connect();
//        console.log('Successfully connected to MongoDB Atlas!');

//        return mongoClient;
//    } catch (error) {
//        console.error('Connection to MongoDB Atlas failed!', error);
//        process.exit();
//    }
// }
var path = require('path');
var open = require('open');
var fs = require('fs');
const {MongoClient} = require('mongodb');
async function main() {
	const uri = "mongodb://subhashis:f4glYygzbPIY4QEs@ac-6axwfs8-shard-00-00.orrhpdt.mongodb.net:27017,ac-6axwfs8-shard-00-01.orrhpdt.mongodb.net:27017,ac-6axwfs8-shard-00-02.orrhpdt.mongodb.net:27017/?ssl=true&replicaSet=atlas-13nlg9-shard-0&authSource=admin&retryWrites=true&w=majority";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);

export async function disp() {
    main();
  }