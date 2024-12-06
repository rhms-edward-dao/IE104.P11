import ProfitIcon from "../../images/icons/datacard/Profit.svg";
import ProfitDarkIcon from "../../images/icons/datacard/Profit_Dark.svg";

export const WarehouseDataCard = (theme, trans, values) => {
  const DataCard = [
    {
      value: values.card1,
      img: `${theme === "light" ? ProfitIcon : ProfitDarkIcon}`,
      description: trans.First,
    },
    {
      value: values.card2,
      img: `${theme === "light" ? ProfitIcon : ProfitDarkIcon}`,
      description: trans.Second,
    },
  ];
  return DataCard;
};
