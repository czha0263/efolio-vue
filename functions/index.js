
const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

setGlobalOptions({
  maxInstances: 10,
  region: "australia-southeast1"
});

// Function to count books in Firestore
exports.getBookCount = onRequest(
  { cors: true },
  async (req, res) => {
    try {
      const db = getFirestore();

      const snapshot = await db
        .collection("books")
        .count()
        .get();

      const count = snapshot.data().count;

      res.status(200).json({
        count: count
      });
    } catch (error) {
      console.error("Error counting books:", error);

      res.status(500).json({
        error: "Failed to count books"
      });
    }
  }
);
