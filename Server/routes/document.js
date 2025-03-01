const express = require("express");
const { upload, createDocument } = require("../controllers/document");
const { auth } = require("../middlewares/authCheck");
const documentController = require("../controllers/document");
const router = express.Router();

router.get("/document", documentController.getAllDocuments);
router.get("/document/status", auth, documentController.getDocumentStatus);
router.post("/document", upload, createDocument);
router.put("/document/:id", documentController.updateDocument);
router.delete("/document/:id", documentController.deleteDocument);

module.exports = router;