'use client'
import React from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer,ZoomEvent  } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


const pdfViewer = ({fileName,pageNumber}) => {

    const handleZoom = (e) => {
        console.log(`Zoom to ${e.scale}`);
    };

    return (
        <>
            <div className='w-full overflow-hidden mx-auto'>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={`https://vtugpt-docs.s3.eu-north-1.amazonaws.com/${fileName}`} initialPage={pageNumber-1} defaultScale={1} onZoom={handleZoom} />;
            </Worker>
            </div>
        </>
    )
}

export default pdfViewer