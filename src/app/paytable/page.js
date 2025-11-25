"use client";

import { useRef } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export default function Payslip() {
  const slipRef = useRef(null);

  const downloadPDF = async () => {
    const element = slipRef.current;
    const canvas = await html2canvas(element, { scale: 3 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    pdf.save("payslip.pdf");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Download Button */}
      <button
        onClick={downloadPDF}
        className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Download PDF
      </button>

      {/* Payslip Container */}
      <div
        ref={slipRef}
        className="bg-white w-[750px] p-6 shadow-md border border-gray-300"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h1 className="text-xl font-semibold text-[#0A5EA8]">Payslip</h1>
            <p className="text-gray-600">Sep 2025</p>
          </div>

          <div className="text-right">
            <img src="/logo.png" alt="AMEYA" className="w-28" />
            <p className="text-xs text-gray-500 -mt-1">Your Vision and Our Innovation</p>
          </div>
        </div>

        {/* Name */}
        <div className="border border-gray-300 p-2 font-medium">
          Name: Mahesh
        </div>

        {/* Employee / Payment Details */}
        <div className="border border-gray-300 border-t-0">
          <div className="grid grid-cols-2">
            {/* Left */}
            <table className="w-full text-sm text-left border-r border-gray-300">
              <thead className="bg-blue-100 border-b border-gray-300">
                <tr>
                  <th className="p-2 font-medium">Employee Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2">Emp No.</td>
                  <td className="p-2">100113</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2">Designation</td>
                  <td className="p-2 capitalize">software engineer</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2">PAN</td>
                  <td className="p-2">AAAAA2222A</td>
                </tr>
                <tr>
                  <td className="p-2">Tax Regime</td>
                  <td className="p-2">NEW</td>
                </tr>
              </tbody>
            </table>

            {/* Right */}
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-100 border-b border-gray-300">
                <tr>
                  <th className="p-2 font-medium">Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2">Bank Name</td>
                  <td className="p-2">HDFC Bank</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2">A/c No.</td>
                  <td className="p-2">123456788001</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2">Days Paid</td>
                  <td className="p-2">30</td>
                </tr>
                <tr>
                  <td className="p-2">Location</td>
                  <td className="p-2 uppercase">HYDERABAD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Earnings / Deductions */}
        <table className="w-full mt-6 text-sm border border-gray-300">
          <thead>
            <tr className="bg-blue-100 border-b border-gray-300">
              <th className="p-2 text-left">Earnings</th>
              <th className="p-2 text-left">Current (INR)</th>
              <th className="p-2 text-left">Deductions</th>
              <th className="p-2 text-left">Amount (INR)</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-300">
              <td className="p-2">Basic Salary</td>
              <td className="p-2">15000.00</td>
              <td className="p-2">Provident Fund</td>
              <td className="p-2">1200.00</td>
            </tr>

            <tr className="border-b border-gray-300">
              <td className="p-2">HRA</td>
              <td className="p-2">7000.00</td>
              <td className="p-2">Professional Tax</td>
              <td className="p-2">200.00</td>
            </tr>

            <tr className="border-b border-gray-300">
              <td className="p-2">Conveyance</td>
              <td className="p-2">550.00</td>
              <td className="p-2">Tax</td>
              <td className="p-2">540.00</td>
            </tr>

            <tr className="border-b border-gray-300">
              <td className="p-2">Medical</td>
              <td className="p-2">1000.00</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
            </tr>

            <tr>
              <td className="p-2">Other Allowance</td>
              <td className="p-2">3000.00</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
