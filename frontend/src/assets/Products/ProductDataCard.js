import ProductIcon from "../../images/icons/datacard/TotalProduct.svg";
import ProductDarkIcon from "../../images/icons/datacard/TotalProduct_Dark.svg";
import ProfitIcon from "../../images/icons/datacard/Profit.svg";
import ProfitDarkIcon from "../../images/icons/datacard/Profit_Dark.svg";
import OutOfStockIcon from "../../images/icons/datacard/TotalOutOfStock.svg";
import OutOfStockDarkIcon from "../../images/icons/datacard/TotalOutOfStock_Dark.svg";

export const ProductDataCard = (theme, trans) => {
  const DataCard = [
    {
      value: 10,
      img: `${theme === "light" ? ProductIcon : ProductDarkIcon}`,
      description: trans.First,
    },
    {
      value: 150000000,
      img: `${theme === "light" ? ProfitIcon : ProfitDarkIcon}`,
      description: trans.Third,
    },
    {
      value: 2,
      img: `${theme === "light" ? OutOfStockIcon : OutOfStockDarkIcon}`,
      description: trans.Second,
    },
  ];
  return DataCard;
};
