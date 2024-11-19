// PDFGenerator.tsx
import React, { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { ResumeDto } from "../database/models/Dto";
import { ResumeService } from "../database/services/ResumeService";
import { PDFTemplate } from "./SimpleCVTermplate/PDFTemplate";

// Main component with type annotations
const PDFGenerator: React.FC = () => {
  const [resume, setResume] = useState<ResumeDto>({} as ResumeDto);

  useEffect(() => {
    ResumeService.getResume().then((res) => setResume(res));
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <PDFViewer width="100%" height="100%">
        <PDFTemplate data={resume} />
      </PDFViewer>
    </div>
  );
};

export default PDFGenerator;
