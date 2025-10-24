// components/sidebar/Sidebar.jsx
import React from "react";
import SidebarUpload from "./SidebarUpload";
import DocList from "./DocList";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Upload PDF
        </h2>
        <SidebarUpload />
      </div>

      <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 flex-1 overflow-auto">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Documents
        </h2>
        <DocList />
      </div>
    </div>
  );
}
