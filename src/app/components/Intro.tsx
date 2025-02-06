const Intro = () => {
  return (
    <>
      <h2 className="absolute font-semibold text-left text-[#6f493d] text-4xl -mt-[290px]">
        Hi! Welcome to <span className="text-[#ce9237]">DailyNote</span>.
      </h2>
      <h1 className="absolute font-semibold text-left text-[#6f493d] text-5xl -mt-[185px]">
        What did you do today?
      </h1>
      <h5 className="text-left text-[#402e32] text-lg mt-[150px] leading-[200%]">
        Congrats on another day down.
        <br />
        Didn't do much? Don't feel like jotting it down?
        <br />
        No worries at all. <br />
        After all, our life stories are made up not just by those shining
        moments but also by all those regular, overlooked days.
      </h5>
    </>
  );
};
export default Intro;
