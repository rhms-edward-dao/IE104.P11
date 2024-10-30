import ProfitIcon from "../../images/icons/datacard/Profit.svg";
import ProfitDarkIcon from "../../images/icons/datacard/Profit_Dark.svg";

export const WarehouseDataCard = (theme, trans) => {
  const DataCard = [
    {
      value: 10000000,
      img: `${theme === "light" ? ProfitIcon : ProfitDarkIcon}`,
      description: "Tổng giá trị nhập",
    },
    {
      value: 20000000,
      img: `${theme === "light" ? ProfitIcon : ProfitDarkIcon}`,
      description: "Tổng giá trị xuất",
    },
  ];
  return DataCard;
};
