const Card = (props) => {
  return (
    <div className="flex gap-5 bg-white p-5 shadow-lg transition-all duration-300 dark:bg-[#363636] hover:scale-105 group hover:cursor-default">
      <div className="flex w-2/3 flex-col justify-between space-y-1">
        <h3 className="w-fit mt-3 whitespace-nowrap text-xl font-bold text-black duration-300 dark:text-white transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-500 before:absolute before:bg-gradient-to-l before:from-red-700 before:via-[#ee7272] before:to-[#f6cdcd] before:origin-center before:h-[3px] before:w-0 group-hover:before:w-[50%] before:bottom-[-5px] before:left-[50%] after:transition-[width] after:ease-in-out after:duration-500 after:absolute after:bg-gradient-to-r after:from-red-700 after:via-[#ee7272] after:to-[#f6cdcd] after:origin-center after:h-[3px] after:w-0 group-hover:after:w-[50%] after:bottom-[-5px] after:right-[50%] transform-gpu">
          {props.description}
        </h3>
        <h2 className="mb-3 whitespace-nowrap text-4xl font-bold text-red-500 dark:text-red-800 group-hover:text-red-800 dark:group-hover:text-red-500 transition-colors duration-300">
          {props.value}
        </h2>
      </div>
      <div className="flex w-1/3 items-center justify-center rounded-lg bg-gray-200 transition-colors duration-300 dark:bg-[#0d1117]">
        <img className="m-5 h-14 w-14" src={props.image} alt="Hình chờ" />
      </div>
    </div>
  );
};

export default Card;
