import { useEffect, useState } from "react";
import { HiOutlineDocument } from "react-icons/hi2";
import axios from "axios";

const Status = () => {
    const [documents, setDocuments] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/auth/document/status", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDocuments(response.data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        fetchDocuments();
    }, [token]);

    const getStatusColor = (status) => {
        if (status === "กำลังดำเนินการ") return "text-yellow-600"; 
        if (status === "สำเร็จ") return "text-green-500"; 
        if (status === "ไม่อนุมัติ") return "text-red-500"; 
        return "text-gray-500"; 
    };

    return (
        <div className="max-w-9/10 mx-auto p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">สถานะเอกสาร</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-3 ">
                {documents.map((doc) => (
                    <div key={doc.DocumentID} className="bg-gray-100 rounded-xl shadow-md p-4 flex items-center space-x-4">
                        <HiOutlineDocument className="w-14 h-12"/>
                        <div className="flex-1">
                            <p className="text-gray-700 font-bold">หมายเลขเอกสาร: {doc.DocumentID}</p>
                            <p className="text-gray-600">ประเภท: {doc.type}</p>
                            <p className="text-gray-600">รายละเอียด: {doc.detail}</p>
                            <p className="text-gray-600">วันที่ยื่นเอกสาร: {doc.upload_date}</p>
                            <p className={`font-bold ${getStatusColor(doc.status)}`}>สถานะปัจจุบัน: {doc.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Status;
