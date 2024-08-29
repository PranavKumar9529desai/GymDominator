function Quote() {
  return (
    <div className="flex justify-center items-center  h-screen w-ful    relative">
      <div className="w-full h-full flex justify-center items-center">
        <div className="absolute  z-20  text-white text-center w-full text-5xl font-extrabold font-pop  leading-loose font-serif   ">
          <div>Pursue greatness</div>
          <div>with</div>
          <div className="text-7xl !font-[1200px] ">
            <span className=" !font-[1200px] border-b-2  bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">
              Gymdominator
            </span>
          </div>
          <br />
        </div>
        <div className="w-full h-full pr-1 blur-[0.5px]">
          {/* <img
            src={signnup}
            alt="gym image"
            className="object-top object-cover bg-center w-full h-full"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Quote;
