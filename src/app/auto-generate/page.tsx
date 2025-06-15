'use client'
import React, { useState } from 'react';
import { Download, FileText, Ship, CreditCard } from 'lucide-react';

const ImportExportDocs = () => {
  const [selectedDoc, setSelectedDoc] = useState('bill-of-exchange');
  
  // Dummy data for Indian import/export scenario
  const dummyData = {
    exporter: {
      name: "Tata Steel Limited",
      address: "Jamshedpur Works, Jameshedpur, Jharkhand - 831001",
      panNumber: "AAACT2727A",
      gstNumber: "20AAACT2727A1ZA",
      ieCode: "0306024692",
      phone: "+91-657-6651234",
      email: "export@tatasteel.com"
    },
    importer: {
      name: "Global Steel Trading LLC",
      address: "Dubai International City, Dubai, UAE",
      phone: "+971-4-8851234",
      email: "imports@globalsteel.ae"
    },
    shipment: {
      description: "Hot Rolled Steel Coils",
      hsCode: "72082500",
      quantity: "500 MT",
      unitPrice: "₹45,000",
      totalValue: "₹2,25,00,000",
      currency: "INR",
      portOfLoading: "JNPT, Mumbai",
      portOfDischarge: "Jebel Ali Port, Dubai",
      vessel: "MV Steel Carrier",
      blNumber: "JNPT240615001",
      containerNo: "TCLU1234567",
      sealNo: "SL789456"
    },
    dates: {
      shipmentDate: "2025-06-15",
      expiryDate: "2025-07-15",
      issueDate: "2025-06-15"
    },
    bank: {
      name: "State Bank of India",
      branch: "Fort Branch, Mumbai",
      address: "Horniman Circle, Fort, Mumbai - 400001",
      swiftCode: "SBININBB104"
    }
  };

  const downloadDocument = (docType) => {
    const element = document.getElementById(`${docType}-content`);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${docType === 'bill-of-exchange' ? 'Bill of Exchange' : 'Bill of Lading'}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; }
            .header { text-align: center; margin-bottom: 30px; }
            .content { margin: 20px 0; }
            .signature-section { margin-top: 50px; display: flex; justify-content: space-between; }
            .signature-box { border-top: 1px solid #000; padding-top: 10px; width: 200px; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            td, th { padding: 8px; border: 1px solid #ddd; text-align: left; }
            .no-border { border: none; }
            .bold { font-weight: bold; }
            .center { text-align: center; }
            .right { text-align: right; }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const BillOfExchange = () => (
    <div id="bill-of-exchange-content" className="bg-white p-8 max-w-4xl mx-auto">
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-2xl font-bold mb-2">BILL OF EXCHANGE</h1>
        <p className="text-sm">No. BE{dummyData.dates.issueDate.replace(/-/g, '')}/001</p>
      </div>

      <div className="mb-6">
        <p className="text-sm mb-2">Place: Mumbai, India</p>
        <p className="text-sm">Date: {new Date(dummyData.dates.issueDate).toLocaleDateString('en-IN')}</p>
      </div>

      <div className="mb-6">
        <p className="font-semibold">Exchange for ₹{dummyData.shipment.totalValue}</p>
      </div>

      <div className="mb-6 leading-relaxed">
        <p className="mb-4">
          <span className="font-semibold">At sight</span> of this FIRST of Exchange (Second unpaid), pay to the order of 
          <span className="font-semibold underline"> {dummyData.exporter.name}</span> the sum of 
          <span className="font-semibold">Rupees Two Crores Twenty Five Lakhs Only (₹{dummyData.shipment.totalValue})</span>
        </p>
        
        <p className="mb-4">
          Value received and charge the same to account as advised.
        </p>

        <p className="mb-6">
          Being payment for: <span className="font-semibold">{dummyData.shipment.description}</span> as per Invoice and shipping documents.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold mb-2">TO (DRAWEE):</h3>
          <div className="border p-3">
            <p className="font-semibold">{dummyData.importer.name}</p>
            <p>{dummyData.importer.address}</p>
            <p>Phone: {dummyData.importer.phone}</p>
            <p>Email: {dummyData.importer.email}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">FOR (DRAWER):</h3>
          <div className="border p-3">
            <p className="font-semibold">{dummyData.exporter.name}</p>
            <p>{dummyData.exporter.address}</p>
            <p>PAN: {dummyData.exporter.panNumber}</p>
            <p>GST: {dummyData.exporter.gstNumber}</p>
            <p>IEC: {dummyData.exporter.ieCode}</p>
          </div>
        </div>
      </div>

      <table className="w-full border-collapse border border-black mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2">Description</th>
            <th className="border border-black p-2">Quantity</th>
            <th className="border border-black p-2">Unit Price</th>
            <th className="border border-black p-2">Amount (INR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2">{dummyData.shipment.description}</td>
            <td className="border border-black p-2 text-center">{dummyData.shipment.quantity}</td>
            <td className="border border-black p-2 text-right">{dummyData.shipment.unitPrice}</td>
            <td className="border border-black p-2 text-right font-semibold">{dummyData.shipment.totalValue}</td>
          </tr>
        </tbody>
      </table>

      <div className="mb-8">
        <p><span className="font-semibold">Terms:</span> At Sight</p>
        <p><span className="font-semibold">Maturity Date:</span> {new Date(dummyData.dates.expiryDate).toLocaleDateString('en-IN')}</p>
      </div>

      <div className="flex justify-between items-end mt-16">
        <div>
          <p className="text-sm mb-2">Accepted:</p>
          <div className="border-t border-black w-48 pt-2 mt-8">
            <p className="text-sm text-center">Drawee's Signature & Date</p>
          </div>
        </div>
        
        <div>
          <div className="border-t border-black w-48 pt-2">
            <p className="text-sm text-center">For {dummyData.exporter.name}</p>
            <p className="text-sm text-center mt-4">(Authorized Signatory)</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs text-gray-600">
        <p>This Bill of Exchange is governed by the Negotiable Instruments Act, 1881 of India.</p>
      </div>
    </div>
  );

  const BillOfLading = () => (
    <div id="bill-of-lading-content" className="bg-white p-8 max-w-4xl mx-auto">
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-2xl font-bold mb-2">BILL OF LADING</h1>
        <p className="text-sm">B/L No: {dummyData.shipment.blNumber}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm mb-6">
        <div>
          <p><span className="font-semibold">Port of Loading:</span></p>
          <p>{dummyData.shipment.portOfLoading}</p>
        </div>
        <div>
          <p><span className="font-semibold">Port of Discharge:</span></p>
          <p>{dummyData.shipment.portOfDischarge}</p>
        </div>
        <div>
          <p><span className="font-semibold">Date:</span></p>
          <p>{new Date(dummyData.dates.shipmentDate).toLocaleDateString('en-IN')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold mb-2 bg-gray-100 p-2">SHIPPER/EXPORTER:</h3>
          <div className="border p-3">
            <p className="font-semibold">{dummyData.exporter.name}</p>
            <p>{dummyData.exporter.address}</p>
            <p>IEC Code: {dummyData.exporter.ieCode}</p>
            <p>GST No: {dummyData.exporter.gstNumber}</p>
            <p>Phone: {dummyData.exporter.phone}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2 bg-gray-100 p-2">CONSIGNEE:</h3>
          <div className="border p-3">
            <p className="font-semibold">{dummyData.importer.name}</p>
            <p>{dummyData.importer.address}</p>
            <p>Phone: {dummyData.importer.phone}</p>
            <p>Email: {dummyData.importer.email}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2 bg-gray-100 p-2">NOTIFY PARTY:</h3>
        <div className="border p-3">
          <p>Same as Consignee</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm mb-6">
        <div>
          <p><span className="font-semibold">Vessel:</span> {dummyData.shipment.vessel}</p>
        </div>
        <div>
          <p><span className="font-semibold">Container No:</span> {dummyData.shipment.containerNo}</p>
        </div>
        <div>
          <p><span className="font-semibold">Seal No:</span> {dummyData.shipment.sealNo}</p>
        </div>
      </div>

      <table className="w-full border-collapse border border-black mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2">Marks & Numbers</th>
            <th className="border border-black p-2">Description of Goods</th>
            <th className="border border-black p-2">Quantity</th>
            <th className="border border-black p-2">Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2">
              <p>Container: {dummyData.shipment.containerNo}</p>
              <p>Seal: {dummyData.shipment.sealNo}</p>
              <p>HSN: {dummyData.shipment.hsCode}</p>
            </td>
            <td className="border border-black p-2">
              <p className="font-semibold">{dummyData.shipment.description}</p>
              <p>As per commercial invoice</p>
              <p>FOB Value: {dummyData.shipment.totalValue}</p>
            </td>
            <td className="border border-black p-2 text-center">{dummyData.shipment.quantity}</td>
            <td className="border border-black p-2 text-center">500 MT</td>
          </tr>
        </tbody>
      </table>

      <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
        <div>
          <p><span className="font-semibold">Freight:</span> PREPAID</p>
          <p><span className="font-semibold">No. of Original B/L:</span> THREE (03)</p>
        </div>
        <div>
          <p><span className="font-semibold">Place of Receipt:</span> {dummyData.shipment.portOfLoading}</p>
          <p><span className="font-semibold">Place of Delivery:</span> {dummyData.shipment.portOfDischarge}</p>
        </div>
      </div>

      <div className="mb-8 text-sm">
        <h4 className="font-semibold mb-2">TERMS AND CONDITIONS:</h4>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>The goods are carried subject to the terms and conditions of the carrier's standard bill of lading.</li>
          <li>This Bill of Lading is issued in accordance with the Indian Carriage of Goods by Sea Act, 1925.</li>
          <li>All customs duties, taxes, and charges are for the account of the consignee.</li>
          <li>Delivery of goods will be made against surrender of original Bill of Lading.</li>
        </ul>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-semibold mb-4">SHIPPED ON BOARD</p>
          <p className="text-sm">Date: {new Date(dummyData.dates.shipmentDate).toLocaleDateString('en-IN')}</p>
          <div className="border-t border-black w-48 pt-2 mt-8">
            <p className="text-sm text-center">Master's Signature</p>
          </div>
        </div>
        
        <div>
          <div className="border-t border-black w-48 pt-2">
            <p className="text-sm text-center">For Shipping Company</p>
            <p className="text-sm text-center mt-4">(Authorized Agent)</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <FileText className="text-blue-600" />
            Import Export Document Generator
          </h1>
          <p className="text-gray-600">Generate professional import/export documents for Indian trade</p>
        </div>

        {/* Document Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Document Type</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedDoc('bill-of-exchange')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedDoc === 'bill-of-exchange' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <CreditCard size={20} />
              Bill of Exchange
            </button>
            <button
              onClick={() => setSelectedDoc('bill-of-lading')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedDoc === 'bill-of-lading' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Ship size={20} />
              Bill of Lading
            </button>
          </div>
        </div>

        {/* Document Preview */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {selectedDoc === 'bill-of-exchange' ? 'Bill of Exchange' : 'Bill of Lading'} Preview
            </h2>
            <button
              onClick={() => downloadDocument(selectedDoc)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={20} />
              Download PDF
            </button>
          </div>
          <div className="p-6">
            {selectedDoc === 'bill-of-exchange' ? <BillOfExchange /> : <BillOfLading />}
          </div>
        </div>

        {/* Sample Data Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Sample Data Information</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><span className="font-medium">Exporter:</span> {dummyData.exporter.name} (India)</p>
            <p><span className="font-medium">Importer:</span> {dummyData.importer.name} (UAE)</p>
            <p><span className="font-medium">Goods:</span> {dummyData.shipment.description}</p>
            <p><span className="font-medium">Value:</span> {dummyData.shipment.totalValue} INR</p>
            <p className="text-xs text-blue-600 mt-2">
              * This component uses dummy data for demonstration. In production, integrate with your data source.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExportDocs;