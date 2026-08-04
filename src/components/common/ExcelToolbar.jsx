import React from "react";

const ExcelToolbar = ({
    onDownloadTemplate,
    onUpload,
    onExport
}) => {

    return (
        <div className="d-flex gap-2 mb-3 flex-wrap">

            <button
                className="btn btn-outline-success"
                onClick={onDownloadTemplate}
            >
                📥 Download Template
            </button>

            <label className="btn btn-outline-primary mb-0">
                📤 Upload Excel
                <input
                    type="file"
                    hidden
                    accept=".xlsx"
                    onChange={onUpload}
                />
            </label>

            <button
                className="btn btn-outline-warning"
                onClick={onExport}
            >
                📊 Export Excel
            </button>

        </div>
    );
};

export default ExcelToolbar;