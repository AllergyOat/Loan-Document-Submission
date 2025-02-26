const express = require("express");
const { upload, createDocument } = require("../controllers/document");
const documentController = require("../controllers/document");
const router = express.Router();

router.get("/document", documentController.getDocuments);
router.post("/document", upload, createDocument);
router.put("/document/:id", documentController.updateDocument);
router.delete("/document/:id", documentController.deleteDocument);

module.exports = router;