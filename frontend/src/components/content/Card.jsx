const Card = (props) => {
  return (
    <div className="flex gap-5 bg-white p-5 shadow-lg transition-colors duration-300 dark:bg-[#363636]">
      <div className="flex w-2/3 flex-col justify-between">
        <h3 className="mt-3 whitespace-nowrap text-xl font-bold text-black transition-colors duration-300 dark:text-white">
          {props.description}
        </h3>
        <h2 className="mb-3 whitespace-nowrap text-4xl font-bold text-red-500">
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
