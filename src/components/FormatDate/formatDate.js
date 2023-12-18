function formatDate(inputString) {
    const inputDate = new Date(inputString);
    
    // Kiểm tra nếu inputDate không hợp lệ
    if (isNaN(inputDate.getTime())) {
      return "Invalid Date";
    }
  
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
    const year = inputDate.getFullYear() % 100; // Lấy chỉ số hai cuối của năm
  
    // Đảm bảo ngày và tháng có hai chữ số
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year < 10 ? `0${year}` : year;
  
    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  }
export default formatDate;
