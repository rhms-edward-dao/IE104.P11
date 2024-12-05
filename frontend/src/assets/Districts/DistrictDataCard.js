import ProductIcon from "../../images/icons/datacard/TotalProduct.svg";
import ProductDarkIcon from "../../images/icons/datacard/TotalProduct_Dark.svg";
import ProfitIcon from "../../images/icons/datacard/Profit.svg";
import ProfitDarkIcon from "../../images/icons/datacard/Profit_Dark.svg";

export const DistrictDataCard = (theme, trans, statistics) => {
  const DataCard = [
    {
      value: statistics.totalDistrict,
      img: `${theme === "light" ? ProductIcon : ProductDarkIcon}`,
      description: trans.First,
    },
    {
      value: statistics.totalCity,
      img: `${theme === "light" ? ProfitIcon : ProfitDarkIcon}`,
      description: trans.Second,
    },
  ];
  return DataCard;
};
