import React from "react";

const ExcelToolbar = ({
    onDownloadTemplate,
    onUpload,
    onExport,
    showUpload = true,
    showExport = true,
    showDownloadTemplate = true
}) => {

    return (
        <div className="d-flex gap-2 mb-3 flex-wrap">

            {showDownloadTemplate && (
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={onDownloadTemplate}
                >
                    📥 Download Template
                </button>
            )}

            {showUpload && (
                <label className="btn btn-outline-primary mb-0">
                    📤 Upload Excel

                    <input
                        type="file"
                        hidden
                        accept=".xlsx"
                        onChange={onUpload}
                    />
                </label>
            )}

            {showExport && (
                <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={onExport}
                >
                    📊 Export Excel
                </button>
            )}

        </div>
    );
};

export default ExcelToolbar;