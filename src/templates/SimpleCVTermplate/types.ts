// types.ts
export interface Item {
  name: string;
  quantity: number;
  price: string;
}

export interface PDFData {
  companyName: string;
  clientName: string;
  email: string;
  phone: string;
  items: Item[];
  total: string;
}

export interface PDFTemplateProps {
  data: PDFData;
}
