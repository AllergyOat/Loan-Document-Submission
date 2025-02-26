import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateDocument = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [type, setType] = useState("");
    const [detail, setDetail] = useState("");
    const [file, setFile] = useState(null);

    const UserID = localStorage.getItem("UserID");
    const name = localStorage.getItem("name");

    if (!UserID || !name) {
        alert("User not found. Please log in again.");
        navigate("/login");
        return null;
    }

    useEffect(() => {
        if (window.location.pathname.includes("/document/loan")) {
            setType("การขอกู้ยืม");
            if (id === "1") {
                setDetail("ส่งเอกสารกู้ยืมปี 2568"); 
            } else if (id === "2") {
                setDetail("กู้ยืมเงินภาคปลาย 2567");
            }
        } else if (window.location.pathname.includes("/document/refund")) {
            setType("การขอคืนเงิน");
            if (id === "1") {
                setDetail("กรณีมีสิทธิสำรองจ่ายไปก่อน");
            } else if (id === "2") {
                setDetail("กรณีนิสิตมีผลการเรียนดี A15 หน่วยกิต");
            }
        }
    }, [id]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCreateDocument = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);
        formData.append("detail", detail);
        formData.append("upload_date", new Date().toISOString().slice(0, 10));
        formData.append("UserID", UserID);
        formData.append("name", name);

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/document",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert(response.data.message);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert(error.response?.data?.message || "Failed to upload document");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[90vh] bg-gray-100">
        <div className="w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Upload Document</h2>
            <form onSubmit={handleCreateDocument} className="space-y-4">
                {/* Document Type (Disabled) */}
                <label className="block">
                    <span className="text-gray-700">Document Type</span>
                    <input
                        type="text"
                        value={type}
                        readOnly
                        className="block w-full p-2 mt-1 border rounded-md bg-gray-200 cursor-not-allowed"
                    />
                </label>

                {/* Document Detail (Disabled) */}
                <label className="block">
                    <span className="text-gray-700">Details</span>
                    <input
                        type="text"
                        value={detail}
                        readOnly
                        className="block w-full p-2 mt-1 border rounded-md bg-gray-200 cursor-not-allowed"
                    />
                </label>

                {/* File Upload Input */}
                <label className="block">
                    <span className="text-gray-700">Upload File</span>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full p-2 mt-1 border rounded-md"
                        required
                    />
                </label>
                <div className="pt-4">
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                >
                    Upload Document
                </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default CreateDocument;
