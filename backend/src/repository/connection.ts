// import { MongoClient, ServerApiVersion } from "mongodb";

// import { uri } from "../config";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// try {
//   // Connect the client to the server
//   client.connect().then(() => {
//     client
//       .db("admin")
//       .command({ ping: 1 })
//       .then(() => {
//         console.log(
//           "Pinged your deployment. You successfully connected to MongoDB!"
//         );
//       });
//   });
// } catch (err) {
//   console.error(err);
// }

// let db = client.db("competition");

// export default db;
