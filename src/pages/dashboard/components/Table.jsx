import React, { useMemo, useState } from "react";
import { Table } from "antd";
import isEmty from "lodash/isEmpty";
import { RECORD_PER_PAGE } from "../common/constant";

const FFTable = ({
	headers = [],
	data = [],
	loading = false,
	onPaginationChange = () => {},
	totalRecords = 0,
	page = 1,
	components,
	rowClassName = () => {},
	...props
}) => {
	const [paginationState, setPagination] = useState({ current: page });
	const onChange = (current, pageSize) => {
		setPagination({ current, pageSize });
		onPaginationChange(current, pageSize);
	};

	const pagination = useMemo(() => {
		if (typeof props.pagination === "boolean") return props.pagination;
		return {
			defaultPageSize: RECORD_PER_PAGE,
			defaultCurrent: 1,
			showSizeChanger: true,
			total: totalRecords,
			...paginationState,
			showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
			onChange,
			onShowSizeChange: onChange,
		};
	}, [props.pagination, totalRecords, paginationState, onChange]);

	const emptyData = useMemo(() => {
		if (!loading && isEmty(data))
			return {
				emptyText: (
					<span>
						<img alt="ava" src="" />
						<p style={{ marginRight: "2px" }}>No Data</p>
					</span>
				),
			};

		return null;
	}, [loading, data]);

	return (
		<Table
			size="middle"
			loading={loading}
			loadingIndicator={<div>loading...</div>}
			columns={headers}
			locale={emptyData}
			dataSource={data}
			bordered
			{...props}
			pagination={{ pagination, hideOnSinglePage: true }}
			components={components}
			rowClassName={rowClassName}
		/>
	);
};

export default FFTable;
