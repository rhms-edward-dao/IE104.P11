import ProductIcon from "../../images/icons/datacard/TotalProduct.svg";
import ProductDarkIcon from "../../images/icons/datacard/TotalProduct_Dark.svg";
import ProfitIcon from "../../images/icons/datacard/Profit.svg";
import ProfitDarkIcon from "../../images/icons/datacard/Profit_Dark.svg";
import OutOfStockIcon from "../../images/icons/datacard/TotalOutOfStock.svg";
import OutOfStockDarkIcon from "../../images/icons/datacard/TotalOutOfStock_Dark.svg";

export const ProductDataCard = (theme, trans, firstValue, secondValue, thirdValue) => {
  const DataCard = [
    {
      value: firstValue,
      img: `${theme === "light" ? ProductIcon : ProductDarkIcon}`,
      description: trans.First,
    },
    {
      value: secondValue,
      img: `${theme === "light" ? ProfitIcon : ProfitDarkIcon}`,
      description: trans.Second,
    },
    {
      value: thirdValue,
      img: `${theme === "light" ? OutOfStockIcon : OutOfStockDarkIcon}`,
      description: trans.Third,
    },
  ];
  return DataCard;
};
