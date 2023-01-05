import React, { useEffect, useState } from "react";
import get from "lodash/get";
import PropTypes from "prop-types";

import { Empty, ErrorState } from "@/Components/States";
import { Card, CardBody, CardFooter, CardHeader } from "@/Components/Card";
import { Pill, Loading, PaginationBar } from "@/Components/Partials";
import Actions from "./Actions";

import { useLanguage } from "@/Hooks";

const Table = ({ modals, title, actions, fetchData, columns }) => {
    const { c } = useLanguage();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const handleFetchData = async (page = 1) => {
        if (!fetchData) {
            return;
        }

        setError(false);
        setLoading(true);

        const request = await fetchData(page);

        request.success ? setData(request.data) : setError(true);

        setLoading(false);
    };

    useEffect(() => {
        if (handleFetchData) {
            handleFetchData();
        }
    }, []);

    return (
        <Card>
            <CardHeader
                headerClassName="flex justify-between items-center"
            >
                {title}

                {actions && (
                    <Actions
                        handleRefresh={handleFetchData}
                        actions={actions}
                        modals={modals}
                    />
                )}
            </CardHeader>

            {error && (
                <ErrorState>
                    <Actions
                        actions={[
                            {
                                type: "primary_button",
                                onClick: handleFetchData,
                                label: "try_again",
                            },
                        ]}
                    />
                </ErrorState>
            )}

            {loading && (
                <CardBody>
                    <Loading />
                </CardBody>
            )}

            {!loading && !error && data && (
                <>
                    {data.pagination?.total === 0 && (
                        <Empty
                            title={c("no_data_title")}
                            message={c("no_data_message")}
                        >
                            <Actions
                                handleRefresh={handleFetchData}
                                actions={actions}
                                modals={modals}
                            />
                        </Empty>
                    )}

                    {data.pagination?.total > 0 && (
                        <>
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {columns.map((column, key) => (
                                            <th
                                                key={`header-${key}`}
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                {c(column.label_ref)}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {data.data.map((item, key) => (
                                        <tr key={key}>
                                            {columns.map((column, columnKey) => (
                                                <td
                                                    key={`${key}-${columnKey}`}
                                                    className="whitespace-nowrap px-4 py-4 text-sm text-gray-500"
                                                    width={column.actions ? "1px" : "auto"}
                                                >
                                                    {column.actions
                                                        ? (
                                                                <Actions
                                                                    handleRefresh={handleFetchData}
                                                                    actions={column.actions}
                                                                    item={item}
                                                                    routes={item.routes}
                                                                    modals={modals}
                                                                />
                                                            )
                                                        : (
                                                                <RenderValue item={item} column={column} />
                                                            )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {data.pagination && (
                                <CardFooter>
                                    <PaginationBar
                                        total={data.pagination.total}
                                        pageCount={data.pagination.last_page}
                                        page={data.pagination.current_page}
                                        goToPage={fetchData}
                                    />
                                </CardFooter>
                            )}
                        </>
                    )}
                </>
            )}
        </Card>
    );
};

Table.propTypes = {
    title: PropTypes.string,
    actions: PropTypes.array,
    loading: PropTypes.bool,
    data: PropTypes.shape({
        data: PropTypes.array,
        pagination: PropTypes.object,
    }),
    fetchData: PropTypes.func,
    columns: PropTypes.array,
    handleRefresh: PropTypes.func,
    modals: PropTypes.object,
};

const RenderValue = ({ item, column }) => {
    const { c } = useLanguage();

    if (column.format) {
        return column.format(item[column.field]);
    }

    if (column.pill) {
        const pillProps = column.pill(item[column.field]);

        return <Pill type={pillProps.type} label={c(pillProps.label_ref)} />;
    }

    return get(item, column.field);
};

RenderValue.propTypes = {
    item: PropTypes.object,
    column: PropTypes.object,
};

export default Table;
