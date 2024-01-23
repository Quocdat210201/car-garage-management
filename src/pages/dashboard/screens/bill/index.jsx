import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Header from "../../components/Header";
import BillDetail from "./billDetail";
import AddNewBill from "./addBillDetail";
import { useState, useEffect } from "react";
import { getBill } from "../../.././../service/UserService";
import { format, parseISO } from "date-fns";
import ReactPaginate from "react-paginate";

function Bill() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [modalDetail, setModalDetail] = useState(false);
  const [showmodalAddNew, setShowModalAddNew] = useState(false);
  const [bill, setBill] = useState([]);
  const [billDetail, setBillDetail] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const addNumbering = (data) => {
    return data.map((item, index) => ({ ...item, stt: index + 1 }));
  };

  const getListBill = async () => {
    try {
      const { data } = await getBill();
      const newData = addNumbering(data.data);
      setBill(newData);
    } catch {
      console.error();
    }
  };
  useEffect(() => {
    getListBill();
  }, []);

  console.log({ bill });

  const handleShowDetail = (data) => {
    setModalDetail(true);
    setBillDetail(data);
  };

  const handleShowAddNew = () => {
    setShowModalAddNew(true);
  };

  const handleCancel = () => {
    setModalDetail(false);
    setShowModalAddNew(false);
  };

   // Pagination
   useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(bill.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(bill.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, bill]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bill.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };


  return (
    <div className="m-5">
      <div className="flex justify-between ">
        <Header title="Hóa đơn" subtitle="Quản lý hóa đơn" />
        <div color={colors.grey[100]}>
          {/* <button
            style={{
              backgroundColor: colors.blueAccent[700],
              padding: "10px 16px",
              borderRadius: "4px",
              marginRight: "10px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleShowAddNew}>
            <AddIcon />
            <span className="ml-1">Thêm mới hóa đơn</span>
          </button> */}
          <button
            style={{
              backgroundColor: colors.blueAccent[700],
              padding: "10px 16px",
              borderRadius: "4px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <FileUploadIcon />
            <span className="ml-1">Xuất file excel</span>
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left rtl:text-right">
          <thead
            className=""
            style={{ backgroundColor: colors.blueAccent[700] }}>
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                Tên khách hàng
              </th>
              <th scope="col" className="px-6 py-3">
                Biển số xe
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày tạo
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái thanh toán
              </th>
              <th scope="col" className="px-6 py-3">
                Ghi chú
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((data, index) => (
                <tr
                  className=""
                  style={{ backgroundColor: colors.primary[400] }}
                  key={index}>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.stt}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4">
                    {data.customer.name}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4">
                    {data.car.registrationNumber}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4">
                    {format(parseISO(data.returnCarDate), "dd/MM/yyyy")}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4">
                    {data.paymentStatus === 0 ? (
                      <span
                        style={{
                          color: colors.redAccent[100],
                          background: colors.redAccent[800],
                          padding: "6px 10px",
                          borderRadius: "4px",
                        }}>
                        Chưa thanh toán
                      </span>
                    ) : data.paymentStatus === 1 ? (
                      <span
                        style={{
                          color: colors.redAccent[100],
                          background: colors.greenAccent[500],
                          padding: "6px 10px",
                          borderRadius: "4px",
                        }}>
                        Đã thanh toán
                      </span>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td
                    style={{ color: colors.greenAccent[300] }}
                    className="px-6 py-4">
                    {data.note === null ? (
                      <span>
                        <strong>_</strong>
                      </span>
                    ) : (
                      <span>{data.note}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        handleShowDetail(data);
                      }}>
                      <InfoIcon fontSize="large" className="mx-2" />
                    </button>
                    <button>
                      <EditIcon fontSize="large" className="mx-2" />
                    </button>
                    <button>
                      <DeleteIcon fontSize="large" className="mx-2" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
      {modalDetail && (
        <BillDetail
          open={modalDetail}
          handleCancel={handleCancel}
          isEditModal={true}
          data={billDetail}
        />
      )}
      {showmodalAddNew && (
        <AddNewBill
          open={showmodalAddNew}
          handleCancel={handleCancel}
          isEditModal={true}
        />
      )}
    </div>
  );
}

export default Bill;
