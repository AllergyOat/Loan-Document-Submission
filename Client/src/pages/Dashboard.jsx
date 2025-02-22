import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();

    const newsData = [
        {
            date: "29 พฤศจิกายน 2567",
            title: "การให้กู้ยืม ปีการศึกษา 2567",
            description: "1. ขอเชิญ ประชาสัมพันธ์การให้กู้ยืมปีการศึกษา 2567\n2. เตรียมเอกสารของสถานศึกษาให้เป็นไปตามหลักเกณฑ์\n3. ติดตามข้อมูลข่าวสารผ่านระบบกองทุนเงินให้กู้ยืมเพื่อการศึกษา",
            image: "/assets/images/image 1.png",
            link: "#"
        },
        {
            date: "15 ตุลาคม 2567",
            title: "เรียน SET e-Learning ปี 2567 ได้เลย",
            description: "มาเพิ่มโอกาสในการประกอบอาชีพ ผ่าน e-Learning กว่า 22 หลักสูตรระดับ ป.ตรี และ ปวส.",
            image: "/assets/images/image 2.png",
            link: "#"
        },
        {
            date: "10 ตุลาคม 2567",
            title: "หลักสูตร 'อุ่นใจไซเบอร์'",
            description: "กองทุนพัฒนาบัณฑิตศึกษาเปิดหลักสูตรใหม่เพื่อเสริมสร้างทักษะความปลอดภัยไซเบอร์ในยุคดิจิทัล",
            image: "/assets/images/image 3.png",
            link: "#"
        },
        {
            date: "26 กันยายน 2567",
            title: "โครงการต้นไม้ล้านต้น ล้านความดี",
            description: "ปลูกต้นไม้ให้ครบล้านต้น ร่วมสร้างคุณค่าทางสิ่งแวดล้อมและสังคม",
            image: "/assets/images/image 4.png",
            link: "#"
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            let token = localStorage.getItem("token"); // Get token

            try {
                const response = await axios.get("http://localhost:5000/api/auth/student", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                //Check if the backend sends a new token & update it
                if (response.headers.authorization) {
                    const newToken = response.headers.authorization.split(" ")[1];
                    localStorage.setItem("token", newToken);
                }

            } catch (error) {
                console.error("Error:", error);
                alert("Session expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);


    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <img src="/assets/images/Header.png" className="mx-auto" alt="Header" />
            <div className="block w-full">
                <h1 className="text-4xl font-bold p-10 pt-16 pl-20">สื่อประชาสัมพันธ์ / ข่าวสาร</h1>
            </div>
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {newsData.map((news, index) => (
                        <div key={index} className="bg-gray-100 rounded-xl shadow-md p-4 flex items-center space-x-4">
                            <img src={news.image} alt={news.title} className="w-1/3 h-28 object-cover rounded-lg" />
                            <div className="w-2/3">
                                <h3 className="text-gray-500 text-sm">{news.date}</h3>
                                <h2 className="font-bold text-lg">{news.title}</h2>
                                <p className="text-gray-600 text-sm line-clamp-2">{news.description}</p>
                                <a href={news.link} className="text-blue-500 text-sm font-semibold flex items-center mt-2">
                                    อ่านเพิ่มเติม →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-20">
                <img src="/assets/images/Footer.png" alt="Footer"></img>
            </div>

            <div className="w-full p-6" style={{ backgroundColor: '#355B83', color: '#ffffff' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-4/5 mx-auto text-center text-xs sm:text-sm md:text-base">
                    <a href="/policy" className="border-r border-white px-2 hover:text-gray-300">นโยบายเว็ปไวต์</a>
                    <a href="/policy" className="border-r border-white px-2 hover:text-gray-300">นโยบายการรักษาความมั่นคงปลอดภัย</a>
                    <a href="/policy" className="border-r border-white px-2 hover:text-gray-300">นโยบายการคุ้มครองข้อมูลส่วนบุคคล</a>
                    <a href="/policy" className="hover:text-gray-300">นโยบายการคุกกี้ (Cookies)</a>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
