import Footer from "../Footer/Footer";
import NavbarDonor from "../NavbarDonor/NavbarDonor";

const Loading = () => {
  const spinnerStyle = {
    animation: "spinner 0.6s infinite ease-in-out",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarDonor/>

      <div className="flex justify-center items-center min-h-[86vh]">
        <style>{`
              @keyframes spinner {
                0% { transform: scale(1); }
                50% { transform: scale(1.5); }
                100% { transform: scale(1); }
              }
            `}</style>
        <div className="flex space-x-2">
          <div
            className="w-4 h-4 bg-red-500 rounded-full"
            style={spinnerStyle}
          ></div>
          <div
            className="w-4 h-4 bg-red-500 rounded-full"
            style={spinnerStyle}
          ></div>
          <div
            className="w-4 h-4 bg-red-500 rounded-full"
            style={spinnerStyle}
          ></div>
        </div>
        <div className="fixed bottom-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Loading;
