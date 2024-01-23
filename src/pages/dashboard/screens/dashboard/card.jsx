
// function Card(props) {
//   const { title, total, percent } = props;
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <>
//       <div
//         className="w-[330px] h-[130px] px-3 py-2 rounded-xl"
//         style={{ backgroundColor: colors.grey[900] }}>
//         <div className="flex justify-between">
//           <div className="flex flex-col">
//             <span className="text-[13px] font-semibold uppercase">
//               {title}
//             </span>
//             <span className="text-[24px] font-bold">{total}</span>
//           </div>
//           <PaidIcon className="text-[#676de4] font-50"></PaidIcon>
//         </div>
//         <div className="text-[14px] mt-6">
//           <span
//             style={{ color: colors.greenAccent[400] }}
//             className="font-bold">
//             +{percent}%
//           </span>{" "}
//           so với hôm qua
//         </div>
//       </div>
//     </>
//   );
// }

// export default Card;
