const Card = (props) => {
  return (
    <div className="p-5 flex gap-5 bg-white shadow-xl">
      <div className="flex flex-col justify-between w-2/3">
        <p className="font-bold text-xl whitespace-nowrap mt-3">
          {props.description}
        </p>
        <p className="font-bold text-4xl text-red-500 whitespace-nowrap mb-3">
          {props.value}
        </p>
      </div>
      <div className="w-1/3 flex justify-center items-center bg-gray-100 rounded-lg">
        <img src={props.image} alt="Hình chờ" className="m-5" />
      </div>
    </div>
  );
};

export default Card;
