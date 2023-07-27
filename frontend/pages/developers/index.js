import CardComp from "@/components/developers/CardComp";
const Developers = () => {
  const developersData = [
    {
      name: "Rajan Kumar",
      aboutL: "lorem ipsum",
      role: "Full-stack Developer ",
      twitter: "",
      linkedin: "",
      image: "",
      portfolio:'https://rajan.live'
    },
    {
      name: "Rajan Kumar",
      aboutL: "lorem ipsum",
      role: "Full-stack Developer ",
      twitter: "",
      linkedin: "",
      image: "",
    },
    {
      name: "Rajan Kumar",
      aboutL: "lorem ipsum",
      role: "Full-stack Developer ",
      twitter: "",
      linkedin: "",
      image: "",
    },
    {
      name: "Rajan Kumar",
      aboutL: "lorem ipsum",
      role: "Full-stack Developer ",
      twitter: "",
      linkedin: "",
      image: "",
    },
    {
      name: "Rajan Kumar",
      aboutL: "lorem ipsum",
      role: "Full-stack Developer ",
      twitter: "",
      linkedin: "",
      image: "",
    },
  ];
  return (
    <>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Technical Team
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="1d4040f3-9f3e-4ac7-b117-7d4009658ced"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#1d4040f3-9f3e-4ac7-b117-7d4009658ced)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">Welcome</span>
            </span>{" "}
            our talented team of professionals
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Training and Placement cell, NIT Patna
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {developersData.map((item) => {
            return <CardComp data={item} />;
          })}
        </div>
      </div>
    </>
  );
};
export default Developers;
