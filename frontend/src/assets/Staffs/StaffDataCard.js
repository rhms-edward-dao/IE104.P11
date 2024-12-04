import StaffIcon from "../../images/icons/datacard/TotalCustomer.svg";
import StaffDarkIcon from "../../images/icons/datacard/TotalCustomer_Dark.svg";
import ProfitIcon from "../../images/icons/datacard/Profit.svg";
import ProfitDarkIcon from "../../images/icons/datacard/Profit_Dark.svg";
import PositionIcon from "../../images/icons/datacard/Position.svg";
import PositionDarkIcon from "../../images/icons/datacard/Position_Dark.svg";

export const StaffDataCard = (theme, trans, firstValue, secondValue, thirdValue) => {
  const DataCard = [
    {
      value: firstValue,
      img: `${theme === "light" ? StaffIcon : StaffDarkIcon}`,
      description: trans.First,
    },
    {
      value: secondValue,
      img: `${theme === "light" ? ProfitIcon : ProfitDarkIcon}`,
      description: trans.Second,
    },
    {
      value: thirdValue,
      img: `${theme === "light" ? PositionIcon : PositionDarkIcon}`,
      description: trans.Third,
    },
  ];
  return DataCard;
};
