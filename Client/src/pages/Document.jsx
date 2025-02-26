import { Link } from "react-router-dom";

const LoanOptions = () => {
    return (
        <div className="pt-18 bg-gray-100">
            <div className="max-w-3xl mx-auto p-6 space-y-6 min-h-[80vh]">
            
            {/* Loan Request Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">ประเภทการขอกู้ยืม</h2>
                <div className="space-y-3">
                    <Link to="/document/loan/1" className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
                        <span>ส่งเอกสารกู้ยืมปี 2568</span>
                        <span className="text-xl">&gt;</span> 
                    </Link>
                    <Link to="/document/loan/2" className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
                        <span>นิสิตที่ประสงค์จะกู้ยืมเงินในภาคปลาย 2567</span>
                        <span className="text-xl">&gt;</span> 
                    </Link>
                </div>
            </div>

            {/* Loan Repayment Section */}
            <div className="pt-8">
                <h2 className="text-xl font-semibold mb-4">ประเภทการขอคืนเงิน</h2>
                <div className="space-y-3">
                    <Link to="/document/refund/1" className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
                        <span>กรณีนิสิตสำรองจ่ายไปก่อน</span>
                        <span className="text-xl">&gt;</span> 
                    </Link>
                    <Link to="/document/refund/2" className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
                        <span>กรณีนิสิตมีผลการเรียนดี A15 หน่วยกิต</span>
                        <span className="text-xl">&gt;</span> 
                    </Link>
                </div>
            </div>
            </div>
        </div>
    );
};

export default LoanOptions;
