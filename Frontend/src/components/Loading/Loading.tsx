const Loading = () => {
  const spinnerStyle = {
    animation: "spinner 0.6s infinite ease-in-out",
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <style>{`
            @keyframes spinner {
              0% { transform: scale(1); }
              50% { transform: scale(1.5); }
              100% { transform: scale(1); }
            }
          `}</style>
      <div className="flex space-x-2">
        <div
          className="w-4 h-4 bg-blue-500 rounded-full"
          style={spinnerStyle}
        ></div>
        <div
          className="w-4 h-4 bg-blue-500 rounded-full"
          style={spinnerStyle}
        ></div>
        <div
          className="w-4 h-4 bg-blue-500 rounded-full"
          style={spinnerStyle}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
