import ProductIcon from "../../images/icons/datacard/TotalProduct.svg";
import ProductDarkIcon from "../../images/icons/datacard/TotalProduct_Dark.svg";
import ProfitIcon from "../../images/icons/datacard/Profit.svg";
import ProfitDarkIcon from "../../images/icons/datacard/Profit_Dark.svg";
import OutOfStockIcon from "../../images/icons/datacard/TotalOutOfStock.svg";
import OutOfStockDarkIcon from "../../images/icons/datacard/TotalOutOfStock_Dark.svg";

export const ProductDataCard = (theme, trans, values) => {
  const DataCard = [
    {
      value: values.card1,
      img: `${theme === "light" ? ProductIcon : ProductDarkIcon}`,
      description: trans.First,
    },
    {
      value: values.card2,
      img: `${theme === "light" ? ProfitIcon : ProfitDarkIcon}`,
      description: trans.Second,
    },
    {
      value: values.card3,
      img: `${theme === "light" ? OutOfStockIcon : OutOfStockDarkIcon}`,
      description: trans.Third,
    },
  ];
  return DataCard;
};
