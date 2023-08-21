import React from 'react'

function CompaniesMarquee() {
    return (
        <>
            <div>
                <div className=" m-auto relative bg-[#510505] flex justify-center items-center w-4/5 h-[3rem] shadow-custOne after:content-[''] after:border-[1.5rem] after:border-[#510505] after:border-solid after:relative after:bottom-[-1.43rem] after:z-[-2] after:pl-[0.6rem] after:right-[-2rem] after:border-r-[1.4rem] after:border-r-transparent after:shadow-custTwo before:content-[''] before:border-[1.5rem] before:border-[#510505] before:border-solid before:relative before:bottom-[-1.43rem] before:z-[-2] before:pr-[0.6rem] before:left-[-2rem] before:border-l-[1.4rem] before:border-l-transparent before:shadow-custTwo">

                    {/* innerShield */}
                    <div className="relative z-3 w-full h-4/5 flex py-2 justify-center items-center border-y-[0.09rem] border-dashed border-[#df8a34]" >

                        {/* content */}
                        <p className=" text-white text-sm md:text-xl font-semibold after:absolute after:content-[''] after:bottom-[-1.8rem] after:z-[-1] after:border-[0.7rem] after:border-solid after:left-[-3.3rem] after:border-t-[#c37322] after:border-r-[#c37322] after:border-b-transparent after:border-l-transparent before:border-t-[#c37322] before:border-r-transparent before:border-b-transparent before:border-l-[#c37322] before:absolute before:right-[-3.3rem] before:z-[-1] before:border-[0.7rem] before:border-solid before:content-[''] before:bottom-[-1.8rem]">
                            NIT Patna Student's Gets Placed In
                        </p>
                    </div>
                </div>
            </div>
            <section className="container mb-16">
                <section className="wrapper">
                    <section className="firstScroll">
                        <section className="first">
                            <img src="https://cdn.worldvectorlogo.com/logos/amazon-2.svg" alt="first" height="120px" width="120px" />
                        </section>
                        <section className="second">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg" alt="first" height="120px" width="120px" />
                        </section>
                        <section className="third">
                            <img src="https://cdn.worldvectorlogo.com/logos/atlassian-1.svg" alt="first" height="120px" width="120px" />
                        </section>
                        <section className="fourth ">
                            <img src="https://cdn.worldvectorlogo.com/logos/phonepe-1.svg" alt="first" height="120px" width="120px" />
                        </section>
                        <section className="fifth relative">
                            <img src="https://images.crunchbase.com/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1456398461/tlbgy0u13v8upv9n8mdm.png" className="absolute top-[-3.6rem] left-[1.8rem]" alt="first" height="90px" width="90px" />
                        </section>
                        <section className="sixth">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/TexasInstruments-Logo.svg" alt="first" height="120px" width="120px" />
                        </section>
                        <section className="seventh">
                            <img src="https://cdn.worldvectorlogo.com/logos/adobe-2.svg" alt="first" height="120px" width="120px" />
                        </section>

                    </section>
                    <section className="firstScroll">
                        <section className="first">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Byju%27s_logo.svg/1920px-Byju%27s_logo.svg.png" alt="first" height="120px" width="120px" />
                        </section>
                        <section className="second">
                            <img src="https://cdn.worldvectorlogo.com/logos/samsung.svg" alt="first" height="120px" width="120px" />
                        </section>
                        <section className="third">
                            <img src="https://cdn.worldvectorlogo.com/logos/google-1-1.svg" alt="first" height="120px" width="120px" />
                        </section>
                        <section className="fourth">
                            <img src="https://cdn.worldvectorlogo.com/logos/apple-11.svg" alt="first" height="120px" width="120px" />
                        </section>
                        <section className="fifth">
                            <img src="https://cdn.worldvectorlogo.com/logos/morgan-stanley-1.svg" alt="first" height="120px" width="120px" />
                        </section>
                        <section className="sixth">
                            <img src="https://cdn.worldvectorlogo.com/logos/meta-1.svg" alt="first" height="120px" width="120px" />
                        </section>
                        <section className="seventh">
                            <img src="https://cdn.worldvectorlogo.com/logos/paytm-1.svg" alt="first" height="120px" width="120px" />
                        </section>

                    </section>

                </section>

            </section>

        </>
    )
}

export default CompaniesMarquee