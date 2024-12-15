const Button = ({ addBtn }) => {
  return (
    <div>
      <button className="rounded-md bg-gradient-to-tl from-red-600 via-[#ea4444] to-[#ee7272] px-8 py-1 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-red-600 hover:via-[#ea4444] hover:to-[#ee7272]">
        {addBtn}
      </button>
    </div>
  );
};

export default Button;
