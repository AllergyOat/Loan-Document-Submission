import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [documents, setDocuments] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!token) {
                console.error("No token found in localStorage");
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/auth/documents", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDocuments(response.data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        fetchDocuments();
    }, [token]);

    // ✅ Update Document Status
    const handleUpdateStatus = async (documentId, newStatus) => {
        try {
            await axios.put(
                `http://localhost:5000/api/auth/admin/document/${documentId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setDocuments(
                documents.map((doc) =>
                    doc.DocumentID === documentId ? { ...doc, status: newStatus } : doc
                )
            );
            alert("Document status updated successfully");
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update document status");
        }
    };

    return (
        <div className="max-w-9/10 mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">ข้อมูลเอกสารทั้งหมด</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr className="border">
                        <th className="p-2">หมายเลขเอกสาร</th>
                        <th className="p-2">ประเภท</th>
                        <th className="p-2">รายละเอียด</th>
                        <th className="p-2">ชื่อไฟล์</th>
                        <th className="p-2">วันที่ส่ง</th>
                        <th className="p-2">สถานะ</th>
                        <th className="p-2">UserID</th>  {/* Add User ID column */}
                        <th className="p-2">Username</th> {/* Add Username column */}
                        <th className="p-2">การจัดการ</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {documents.map((doc) => (
                        <tr key={doc.DocumentID} className="border">
                            <td className="p-2">{doc.DocumentID}</td>
                            <td className="p-2">{doc.type}</td>
                            <td className="p-2">{doc.detail}</td>
                            <td className="p-2">
                                <a
                                    href={`http://localhost:5000/uploads/${doc.filename}`} // Link to file
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    {doc.filename}
                                </a>
                            </td>
                            <td className="p-2">{doc.upload_date}</td>
                            <td className="p-2">
                                <select
                                    value={doc.status}
                                    onChange={(e) => handleUpdateStatus(doc.DocumentID, e.target.value)}
                                    className="p-2 rounded-md"
                                >
                                    <option value="รอดำเนินการ">รอดำเนินการ</option>
                                    <option value="สำเร็จ">สำเร็จ</option>
                                    <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
                                </select>
                            </td>
                            <td className="p-2">{doc.UserID}</td> 
                            <td className="p-2">{doc.name}</td> 
                            <td className="p-2">
                                {/* Add more actions if needed */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
