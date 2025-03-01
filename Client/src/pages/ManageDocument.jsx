import { useEffect, useState } from "react";
import axios from "axios";

const ManageDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!token) {
                console.error("No token found in localStorage");
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/auth/document", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDocuments(response.data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        fetchDocuments();
    }, [token]);

    // ✅ Delete Document with Confirmation
    const handleDelete = async (documentId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this document?");

        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/auth/document/${documentId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDocuments(documents.filter(doc => doc.DocumentID !== documentId)); // Remove from UI
                alert("Document deleted successfully.");
            } catch (error) {
                console.error("Error deleting document:", error);
                alert("Failed to delete the document.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen pt-10 bg-[#F7F7F7] rounded-lg text-center">
            <div className="w-full max-w-6xl h-screen pt-10 bg-[#F7F7F7] rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4 py-4">ข้อมูลเอกสาร</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr className="border-1">
                            <th className="p-2">หมายเลขเอกสาร</th>
                            <th className="p-2">ประเภท</th>
                            <th className="p-2">รายละเอียด</th>
                            <th className="p-2">ชื่อไฟล์</th>
                            <th className="p-2">วันที่ส่ง</th>
                            <th className="p-2">การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc) => (
                            <tr key={doc.DocumentID} className="border bg-white">
                                <td className="p-2">{doc.DocumentID}</td>
                                <td className="p-2">{doc.type}</td>
                                <td className="p-2">{doc.detail}</td>
                                <td className="p-2">{doc.filename}</td>
                                <td className="p-2">{doc.upload_date}</td>
                                <td className="p-2">
                                    <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => handleDelete(doc.DocumentID)}>ลบเอกสาร</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default ManageDocuments;
