import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { userApi, updateUserApi } from "../../../../service/UserService";

const Profile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    dateOfBirth: "",
    email: "",
    address: "",
  });

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (event, field) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const { data } = await userApi();
      setUser(data);
    } catch {
      console.error();
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserApi(user);
      toast.success("Lưu thành công !");
      setTimeout(() => {
        setIsEditMode(false); // Set edit mode to false after saving
      }, 0);
    } catch (error) {
      toast.error("Error updating user information");
      console.error(error);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CÁ NHÂN" subtitle="Thông tin cá nhân" />
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          <div className="action flex justify-end items-center">
            {isEditMode && (
              <>
                <button
                  type="submit"
                  style={{
                    backgroundColor: colors.blueAccent[700],
                    padding: "10px 16px",
                    borderRadius: "4px",
                    marginRight: "10px",
                    marginTop: "0px",
                    display: "inline-flex",
                    justifyContent: "center",
                    fontSize: "14px",
                    alignItems: "center",
                  }}
                  onClick={handleUpdateUser}>
                  <SaveIcon />
                <span className="ml-1">Lưu</span>
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: colors.blueAccent[700],
                    padding: "10px 16px",
                    borderRadius: "4px",
                    marginRight: "10px",
                    marginTop: "0px",
                    display: "inline-flex",
                    justifyContent: "center",
                    fontSize: "14px",
                    alignItems: "center",
                  }}
                  onClick={toggleEditMode}>
                  <CancelScheduleSendIcon />
                <span className="ml-1">Hủy</span>
                </button>
              </>
            )}
            {!isEditMode && (
              <button
                type="submit"
                style={{
                  backgroundColor: colors.blueAccent[700],
                  padding: "10px 16px",
                  borderRadius: "4px",
                  marginRight: "10px",
                  marginTop: "0px",
                  display: "inline-flex",
                  justifyContent: "center",
                  fontSize: "14px",
                  alignItems: "center",
                }}
                onClick={toggleEditMode}>
                <EditIcon />
                <span className="ml-1">Chỉnh sửa</span>
              </button>
            )}
          </div>
        </Typography>
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}>
        {({ errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {console.log(user)}
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(1, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 1" },
              }}>
              <input
                type="text"
                placeholder="Họ và tên"
                value={user.name}
                onChange={(event) => handleInputChange(event, "name")}
                className={`custom-input-profile w-full p-4 ${
                  isEditMode ? "" : "opacity-70"
                }`}
                disabled={!isEditMode}
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={user.phoneNumber}
                onChange={(event) => handleInputChange(event, "phoneNumber")}
                className={`custom-input-profile w-full p-4 ${
                  isEditMode ? "" : "opacity-70"
                }`}
                disabled={!isEditMode}
              />
              <input
                type="date"
                placeholder="Ngày sinh"
                value={user.dateOfBirth}
                onChange={(event) => handleInputChange(event, "dateOfBirth")}
                className={`custom-input-profile w-full p-4 ${
                  isEditMode ? "" : "opacity-70"
                }`}
                disabled={!isEditMode}
              />
              <input
                type="text"
                placeholder="Email"
                value={user.email}
                onChange={(event) => handleInputChange(event, "email")}
                className={`custom-input-profile w-full p-4 ${
                  isEditMode ? "" : "opacity-70"
                }`}
                disabled={!isEditMode}
              />
              <input
                type="text"
                placeholder="Địa chỉ"
                value={user.address}
                onChange={(event) => handleInputChange(event, "address")}
                className={`custom-input-profile w-full p-4 ${
                  isEditMode ? "" : "opacity-70"
                }`}
                disabled={!isEditMode}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("Vui lòng nhập họ !"),
  lastName: yup.string().required("Vui lòng nhập tên !"),
  dateOfBirth: yup.string().required("Vui lòng chọn ngày sinh !"),
  email: yup
    .string()
    .email("Email không hợp lệ !")
    .required("Vui lòng nhập email !"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại không đúng !")
    .required("Vui lòng nhập số điện thoại !"),
  address1: yup.string().required("Vui lòng nhập địa chỉ !"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  dateOfBirth: "",
};

export default Profile;
