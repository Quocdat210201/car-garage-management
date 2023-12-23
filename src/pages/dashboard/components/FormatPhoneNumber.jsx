const formatPhoneNumber = (phoneNumber) => {
  // Assuming the input format is always like +84311111111
  //   const countryCode = phoneNumber.slice(0, 3); // Extract country code, e.g., +84
  //   const restOfNumber = phoneNumber.slice(3); // Extract the rest of the number
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
  const formattedPhoneNumber = cleanedPhoneNumber.replace(
    /(\d{3})(\d{3})(\d{4})/,
    "$1 $2 $3"
  );
  return formattedPhoneNumber;
};
export default formatPhoneNumber;
