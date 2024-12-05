import StaffIcon from "../../images/icons/datacard/TotalCustomer.svg";
import StaffDarkIcon from "../../images/icons/datacard/TotalCustomer_Dark.svg";
import ProfitIcon from "../../images/icons/datacard/Profit.svg";
import ProfitDarkIcon from "../../images/icons/datacard/Profit_Dark.svg";
import PositionIcon from "../../images/icons/datacard/Position.svg";
import PositionDarkIcon from "../../images/icons/datacard/Position_Dark.svg";

export const StaffDataCard = (theme, trans, statistics) => {
  const DataCard = [
    {
      value: statistics.totalStaff,
      img: `${theme === "light" ? StaffIcon : StaffDarkIcon}`,
      description: trans.First,
    },
    {
      value: statistics.totalSalary,
      img: `${theme === "light" ? ProfitIcon : ProfitDarkIcon}`,
      description: trans.Second,
    },
    {
      value: statistics.totalPosition,
      img: `${theme === "light" ? PositionIcon : PositionDarkIcon}`,
      description: trans.Third,
    },
  ];
  return DataCard;
};
