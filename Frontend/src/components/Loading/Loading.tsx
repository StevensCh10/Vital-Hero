import Footer from "../Footer/Footer";
import NavbarDonor from "../NavbarDonor/NavbarDonor";

const Loading = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarDonor />

      <div className="flex justify-center items-center min-h-[86vh]">
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div
          className="w-16 h-16 border-4 border-t-transparent border-red-500 rounded-full"
          style={{ animation: "spin 1s linear infinite" }}
        ></div>
      </div>

      <div className="flex items-center bottom-0 justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default Loading;
