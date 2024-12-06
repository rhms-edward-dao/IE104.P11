const Button = ({ addBtn }) => {
  return (
    <div>
      <button className="bg-red-500 font-bold text-white text-lg py-1 px-8 rounded-md">
        {addBtn}
      </button>
    </div>
  );
};

export default Button;
