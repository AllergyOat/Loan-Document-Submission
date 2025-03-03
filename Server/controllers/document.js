const db = require("../server");
const multer = require("multer");
const path = require("path");

// Get all documents
const getAllDocuments = (req, res) => {
    const query = `
        SELECT 
            d.DocumentID, 
            d.type, 
            d.detail, 
            d.filename, 
            DATE_FORMAT(d.upload_date, '%d-%m-%Y') AS upload_date, 
            d.status,
            u.UserID, 
            u.name 
        FROM document d
        JOIN user u ON d.UserID = u.UserID;
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database query error" });
        }

        res.json(result);  
    });
};



const getUserDocuments = (req, res) => {
    console.log("Decoded User in Controller:", req.user);

    if (!req.user || !req.user.UserID) {
        console.log("Authorization Failed: No UserID found in req.user");
        return res.status(401).json({ message: "Unauthorized: User ID is missing" });
    }

    const UserID = req.user.UserID;
    console.log("Fetching documents for UserID:", UserID);

    const query = `
        SELECT 
            d.DocumentID, 
            d.type, 
            d.detail, 
            d.filename, 
            DATE_FORMAT(d.upload_date, '%d-%m-%Y') AS upload_date 
        FROM document d
        WHERE d.UserID = ?;
    `;

    db.query(query, [UserID], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database query error" });
        }

        console.log("Query Result:", result);
        res.json(result);
    });
};



const getDocumentStatus = (req, res) => {
    const UserID = req.user.UserID;

    if (!UserID) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    db.query(
        "SELECT DocumentID, type, detail, DATE_FORMAT(upload_date, '%d-%m-%Y') AS upload_date, status FROM document WHERE UserID = ?",
        [UserID],
        (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database query error" });
            }
            res.json(result);
        }
    );
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // ✅ Store files in `uploads/` folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // ✅ Rename file to avoid conflicts
    }
});



const upload = multer({ storage }).single("file");

const createDocument = (req, res) => {
    let { type, detail, upload_date, UserID, name } = req.body;

    // Ensure upload_date is in correct format
    upload_date = upload_date.replace(/"/g, "");

    if (!/^\d{4}-\d{2}-\d{2}$/.test(upload_date)) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const filename = req.file.filename;
    const filepath = req.file.path;

    db.query(
        "INSERT INTO document (type, detail, filename, filepath, upload_date, UserID, name, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'กำลังดำเนินการ')",
        [type, detail, filename, filepath, upload_date, UserID, name],
        (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database query error" });
            }
            res.json({ message: "Document uploaded successfully", filename, filepath });
        }
    );
};




// Update a document
const updateDocument = async (req, res) => {
    const documentId = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (isNaN(documentId)) return res.status(400).json({ message: "Invalid document ID format" });

    db.query(
        "UPDATE document SET status = ? WHERE DocumentID = ?",
        [status, documentId],
        (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database query error" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Document not found" });
            }

            res.json({ message: "Document status updated successfully" });
        }
    );
};

// Delete a document
const deleteDocument = (req, res) => {
    const documentId = parseInt(req.params.id, 10);
    if (isNaN(documentId)) return res.status(400).json({ message: "Invalid document ID format" });

    db.query("DELETE FROM document WHERE documentID = ?", [documentId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database query error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.json({ message: "Document deleted successfully" });
    });
};


module.exports = { getAllDocuments, getUserDocuments, getDocumentStatus, upload, createDocument, updateDocument, deleteDocument };
