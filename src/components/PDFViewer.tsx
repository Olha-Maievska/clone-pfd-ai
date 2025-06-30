"use client";

import React, { ReactElement } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFViewer = ({ url }: { url: string }) => {
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          CurrentPageInput,
          Download,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          Print,
          ShowSearchPopover,
          Zoom,
          ZoomIn,
          ZoomOut,
        } = slots;
        return (
          <div
            style={{
              alignItems: "center",
              display: "flex",
              width: "100%",
            }}
          >
            <div style={{ padding: "0px 2px" }}>
              <ShowSearchPopover />
            </div>
            <div style={{ padding: "0px 2px" }} className="hidden xs:block">
              <ZoomOut />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <Zoom />
            </div>
            <div style={{ padding: "0px 2px" }} className="hidden xs:block">
              <ZoomIn />
            </div>
            <div
              style={{ padding: "0px 2px", marginLeft: "auto" }}
            >
              <GoToPreviousPage />
            </div>
            <div
              style={{ padding: "0px 1px", width: "40px" }}
            >
              <CurrentPageInput />
            </div>
            <div
              style={{ padding: "0px 2px", marginLeft: "3px" }}
            >
              / <NumberOfPages />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <GoToNextPage />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <Download />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <Print />
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: () => [],
  });
  return (
    <div className="md:w-1/2 w-full h-[calc(100vh-60px)]">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer plugins={[defaultLayoutPluginInstance]} fileUrl={url} />
      </Worker>
    </div>
  );
};

export default PDFViewer;
