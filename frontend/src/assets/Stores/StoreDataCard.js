import StoreIcon from "../../images/icons/sidebar/Stores.svg";
import StoreLightIcon from "../../images/icons/datacard/Stores_Light.svg";
import DebtIcon from "../../images/icons/datacard/TotalDebt.svg";
import DebtDarkIcon from "../../images/icons/datacard/TotalDebt_Dark.svg";
import ProfitIcon from "../../images/icons/datacard/Profit.svg";
import ProfitDarkIcon from "../../images/icons/datacard/Profit_Dark.svg";

export const StoreDataCard = (theme, trans) => {
  const DataCard = [
    {
      value: 10,
      img: `${theme === "light" ? StoreLightIcon : StoreIcon}`,
      description: trans.First,
    },
    {
      value: 150000000,
      img: `${theme === "light" ? DebtIcon : DebtDarkIcon}`,
      description: trans.Second,
    },
    {
      value: 100000000,
      img: `${theme === "light" ? ProfitIcon : ProfitDarkIcon}`,
      description: trans.Third,
    },
  ];
  return DataCard;
};
