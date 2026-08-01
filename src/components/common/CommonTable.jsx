import Loader from "./Loader";
import NoData from "./NoData";

function CommonTable({

    columns,
    data,
    renderActions,
    loading = false

}) {

    if (loading) {

        return <Loader />;

    }

    if (!loading && data.length === 0) {

        return <NoData />;

    }

    return (

        <table className="table table-bordered table-hover shadow">

            <thead className="table-dark">

                <tr>

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

                    data.map(row => (

                        <tr key={row.id}>

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

                    ))

                }

            </tbody>

        </table>

    );

}

export default CommonTable;