import { Pagination } from "antd"
import type { PaginationBarProps } from "../types/FormTypes"


const PaginationBar = ({ current, total, onChange }: PaginationBarProps) => {
    return (
        <Pagination
            current={current}
            pageSize={4}
            total={total}
            onChange={onChange}
        />
    )
}

export default PaginationBar