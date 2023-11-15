import { PDFViewer, Document, Page, Text } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import React from "react";

  const Downloadpdf = () => {
    // Create the PDF document
    const doc = (
      <Document>
        <Page>
          <Text>Hello, React PDF!</Text>
        </Page>
        </Document>
        
    );

    // Generate a PDF blob
    const asPdfBlob = new Blob([doc], { type: "application/pdf" });

    // Save the PDF using file-saver
    saveAs(asPdfBlob, "hello_react_pdf.pdf");
  };
 
export default Downloadpdf;
