import PdfViewer from "@/components/PdfViewer"


const page = ({params}) => {
  return (
    <PdfViewer fileName={params.pdfName[0]} pageNumber={params.pdfName[1]}/>    
  )
}

export default page