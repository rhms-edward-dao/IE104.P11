import CustomerIcon from "../../images/icons/datacard/TotalCustomer.svg";
import CustomerDarkIcon from "../../images/icons/datacard/TotalCustomer_Dark.svg";
import ProfitIcon from "../../images/icons/datacard/Profit.svg";
import ProfitDarkIcon from "../../images/icons/datacard/Profit_Dark.svg";
import DistrictIcon from "../../images/icons/datacard/TotalDistrict.svg";
import DistrictDarkIcon from "../../images/icons/datacard/TotalDistrict_Dark.svg";

export const CustomerDataCard = (theme, trans, values) => {
  const DataCard = [
    {
      value: values.card1,
      img: `${theme === "light" ? CustomerIcon : CustomerDarkIcon}`,
      description: trans.First,
    },
    {
      value: values.card2,
      img: `${theme === "light" ? ProfitIcon : ProfitDarkIcon}`,
      description: trans.Second,
    },
    {
      value: values.card3,
      img: `${theme === "light" ? DistrictIcon : DistrictDarkIcon}`,
      description: trans.Third,
    },
  ];
  return DataCard;
};
