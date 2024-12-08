const Button = ({ addBtn }) => {
  return (
    <div>
      <button className="bg-gradient-to-tl from-red-600 via-[#ea4444] to-[#ee7272] font-bold text-white text-lg py-1 px-8 rounded-md hover:bg-gradient-to-br hover:from-red-600 hover:via-[#ea4444] hover:to-[#ee7272] transition-all duration-300 hover:scale-105">
        {addBtn}
      </button>
    </div>
  );
};

export default Button;
