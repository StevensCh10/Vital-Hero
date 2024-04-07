import Map from "../../components/MapAndInfo/MapAndInfo";
import Navbar from "../../components/Navbar/Navbar";
import "./Bloodcenters.css";

const Bloodcenters = () => {
  return (
    <>
      <div className="bloodcenters-container">
        <Navbar />
        <div className="info-container">
          <div className="info-page-bloodcenters">
            <div className="image">
              <img src="observacao.png"></img>
            </div>
            <div className="text">
              <span>Abaixo é possível visualizar informações dos <b style={{color: "rgb(184, 14, 20)"}}>Hemocentros</b>.</span>
            </div>
          </div>
        </div>
        <span>Hemocentros</span>
        <div className="map-content">
          <Map />
        </div>
      </div>
    </>
  );
};

export default Bloodcenters;
