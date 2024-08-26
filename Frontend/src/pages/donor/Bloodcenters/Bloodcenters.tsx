import Map from "../../../components/MapAndInfo/MapAndInfo";
import Navbar from "../../../components/NavbarDonor/NavbarDonor";

const Bloodcenters = () => {
  return (
    <>
      <div className="flex flex-col items-center text-center justify-center w-full">
        <Navbar />
        <div className="flex flex-col w-full items-center justify-center min-h-[89vh] mt-[3%]">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-[40%] m-0 mb-[5%] mt-[2%] md:w-[25%]">
              <div className="w-[40%]">
                <img className="w-full" src="observacao.png"></img>
              </div>
              <div className="w-[60%]">
                <span className="text-[1em] md:text-[1.2em]">
                  Informações dos{" "}
                  <b>Hemocentros</b>.
                </span>
              </div>
            </div>
          </div>
          <span className="flex justify-center mb-1 mt-2 text-[#035e89] text-2xl md:text-4xl">
            Hemocentros
          </span>
          <div className="mt-[2%] mb-0">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bloodcenters;
