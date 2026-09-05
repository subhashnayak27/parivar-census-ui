import Loader from "./Loader";
import NoData from "./NoData";

function CommonTable({

    columns,
    data,
    renderActions,
    loading = false,
    selectable = false,
    selectedRows = [],
    onRowSelect = () => {},
    onSelectAll = () => {},
    rowKey = "id"

}) {

    if (loading) {

        return <Loader />;

    }

    if (!loading && data.length === 0) {

        return <NoData />;

    }

    const allVisibleSelected =
        selectable &&
        data.length > 0 &&
        data.every(row => selectedRows.includes(row[rowKey]));

    return (

        <table className="table table-bordered table-hover shadow">

            <thead className="table-dark">

                <tr>

                    {selectable && (
                        <th style={{ width: "40px" }}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={allVisibleSelected}
                                onChange={onSelectAll}
                                aria-label="Select all rows"
                            />
                        </th>
                    )}

                    {columns.map(column => (

                        <th key={column.field}>
                            {column.header}
                        </th>

                    ))}

                    {renderActions &&
                        <th>Action</th>
                    }

                </tr>

            </thead>

            <tbody>

                {

                    data.map(row => {

                        const rowId = row[rowKey];
                        const isSelected = selectable && selectedRows.includes(rowId);

                        return (
                            <tr key={rowId}>

                                {selectable && (
                                    <td className="text-center">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={isSelected}
                                            onChange={() => onRowSelect(rowId)}
                                            aria-label={`Select row ${rowId}`}
                                        />
                                    </td>
                                )}

                                {

                                    columns.map(column => (

                                        <td key={column.field}>

                                            {

                                                column.render

                                                    ? column.render(row)

                                                    : row[column.field]

                                            }

                                        </td>

                                    ))

                                }

                                {

                                    renderActions && (

                                        <td>

                                            {

                                                renderActions(row)

                                            }

                                        </td>

                                    )

                                }

                            </tr>
                        );

                    })

                }

            </tbody>

        </table>

    );

}

export default CommonTable;