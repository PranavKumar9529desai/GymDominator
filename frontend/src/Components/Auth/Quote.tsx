import signnup from "@assets/signup.jpg";
function Quote() {
  return (
    <div className="flex justify-center items-center  h-screen w-ful  bg-slate-200  relative">
      {/* <div className="">
        <blockquote className="text-3xl leading-loose font-bold font-sans italic">
          "The customer service I received was <br />
          exceptional. The support team went above <br />
          and beyond to address my concerns."
        </blockquote>
        <div className="font-bold mt-4">Jules Winnfield </div>
        <div className=" font-light">CEO, Acme Inc</div>
      </div> */}
      <div className="w-full h-full flex justify-center items-center">
        <div className="absolute  z-20 bg-gradient-to-r from-gray-400 to-gray-950 via-white bg-clip-text text-transparent text-center w-full text-6xl font-extrabold font-pop  leading-relaxed   ">
          <div>Pursue greatness</div>
          <div>with</div>
          <div className="">
            <span className="border-b-2 ">Gymdominator</span>
          </div>
          <br />
        </div>
        <div className="w-full h-full pr-1 blur-[2px]">
          <img
            src={signnup}
            alt="gym image"
            className="object-top object-cover bg-center w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Quote;
