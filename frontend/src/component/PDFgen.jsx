import React, { useContext } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'jspdf-autotable';

export  const generatePDF = (data) => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(18);
    doc.text('Contacts', 105, 15, 'center');

    // Create table
    const columns = ['Name', 'Email','Spoc','Phone'];
    const rows = data.map(item => [item.name, item.email,item.spoc,item.phone]);

    doc.autoTable({
      startY: 30, // Start table below header
      head: [columns],
      body: rows,
    });

    doc.save('output.pdf');
  };

