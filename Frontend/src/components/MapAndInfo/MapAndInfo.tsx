import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { BloodCenter } from "../../types/BloodCenter";
import { Bloodstock } from "../../types/Bloodstock";
import "leaflet/dist/leaflet.css";
import "./MapAndInfo.css";
import L from 'leaflet';

const Map: React.FC = () => {
  const auth = useContext(AuthContext);
  const [bloodcenters, setBloodcenters] = useState<BloodCenter[]>([]);
  //const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [markers, setMarkers] = useState<JSX.Element[]>([]);
  const [bloodstocks, setBloodstocks] = useState<Bloodstock[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);

  const customIcon = new L.Icon({
    iconUrl: "pino-de-localizacao.png",
    iconSize: [30, 30], // Tamanho do ícone
    iconAnchor: [12, 41], // Ponto do ícone que será ancorado ao marcador
    popupAnchor: [1, -34], // Ponto onde o popup será ancorado
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultBloodstocks = await auth.findAllBloodstocks();
        setBloodstocks(resultBloodstocks);
        const bloodcentersFromLocalStorage = localStorage.getItem("bloodcenters");
        if (bloodcentersFromLocalStorage !== null) {
          const bloodcentersObject = JSON.parse(bloodcentersFromLocalStorage);
          setBloodcenters(bloodcentersObject);
        } else {
          setBloodcenters([]);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coordinatesPromises = bloodcenters.map(async (center) => {
        const coordinates = await getCoordinates(center.address);
        return (
          <Marker
            key={center.id}
            position={coordinates}
            eventHandlers={{ click: () => handleMarkerClick(center.id) }}
            icon={customIcon}
          >
            <Popup>{center.name}</Popup>
          </Marker>
        );
      });

      const markers = await Promise.all(coordinatesPromises);
      setMarkers(markers);
    };

    fetchCoordinates();
  }, [bloodcenters]);

  const handleMarkerClick = (markerId: number) => {
    const bloodcenterBoxes = document.querySelectorAll(".bloodcenter-box");
    bloodcenterBoxes.forEach((box) => {
      if (box.id === markerId.toString()) {
        box.classList.add("selected");
        box.scrollIntoView({ behavior: "smooth" });
      } else {
        box.classList.remove("selected");
      }
    });
  };

  const getCoordinates = async (address: string): Promise<[number, number]> => {
    const fullAddress = `${address}, Pernambuco, Brasil`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      fullAddress
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const { lat, lon } = data[0];
        return [parseFloat(lat), parseFloat(lon)];
      } else {
        throw new Error("Endereço não encontrado");
      }
    } catch (error) {
      console.error("Erro ao obter coordenadas:", error);
      throw error;
    }
  };

  const toggleSelected = (centerId: string) => {
    setSelectedCenter((prevId) => (prevId === centerId ? null : centerId));
  };

  const UrlGenerator = (qttStock: number) => {
    switch (qttStock) {
      case 0:
        return "/bloodbags/blood-bag-0.png";
        break;
      case 5:
        return "/bloodbags/blood-bag-5.png";
        break;
      case 10:
        return "/bloodbags/blood-bag-10.png";
        break;  
      case 15:
        return "/bloodbags/blood-bag-15.png";
        break;
      case 20:
        return "/bloodbags/blood-bag-20.png";
        break;
      case 25:
        return "/bloodbags/blood-bag-25.png";
        break;
      case 30:
        return "/bloodbags/blood-bag-30.png";
        break;
      case 35:
        return "/bloodbags/blood-bag-35.png";
        break;
      case 40:
        return "/bloodbags/blood-bag-40.png";
        break;
      case 45:
        return "/bloodbags/blood-bag-45.png";
        break;
      case 50:
        return "/bloodbags/blood-bag-50.png";
        break;
      case 55:
        return "/bloodbags/blood-bag-55.png";
        break;
      case 60:
        return "/bloodbags/blood-bag-60.png";
        break;
      case 65:
        return "/bloodbags/blood-bag-65.png";
        break;
      case 70:
        return "/bloodbags/blood-bag-70.png";
        break;
      case 75:
        return "/bloodbags/blood-bag-75.png";
        break;
      case 80:
        return "/bloodbags/blood-bag-80.png";
        break;
      case 85:
        return "/bloodbags/blood-bag-85.png";
        break;
      case 90:
        return "/bloodbags/blood-bag-90.png";
        break;
      case 95:
        return "/bloodbags/blood-bag-95.png";
        break;
      case 100:
        return "/bloodbags/blood-bag-100.png";
        break;
      default:
        const intervals = [
          {min: 0.1,max: 4.9, action: () => {return "/bloodbags/blood-bag-2.5.png";}},
          {min: 5.1,max: 9.9, action: () => {return "/bloodbags/blood-bag-7.5.png";}},
          {min: 10.1,max: 14.9, action: () => {return "/bloodbags/blood-bag-12.5.png";}},
          {min: 15.1,max: 19.9, action: () => {return "/bloodbags/blood-bag-17.5.png";}},
          {min: 20.1,max: 24.9, action: () => {return "/bloodbags/blood-bag-22.5.png";}},
          {min: 25.1,max: 29.9, action: () => {return "/bloodbags/blood-bag-27.5.png";}},
          {min: 30.1,max: 34.9, action: () => {return "/bloodbags/blood-bag-32.5.png";}},
          {min: 35.1,max: 39.9, action: () => {return "/bloodbags/blood-bag-37.5.png";}},
          {min: 40.1,max: 44.9, action: () => {return "/bloodbags/blood-bag-42.5.png";}},
          {min: 45.1,max: 49.9, action: () => {return "/bloodbags/blood-bag-47.5.png";}},
          {min: 50.1,max: 54.9, action: () => {return "/bloodbags/blood-bag-52.5.png";}},
          {min: 55.1,max: 59.9, action: () => {return "/bloodbags/blood-bag-57.5.png";}},
          {min: 60.1,max: 64.9, action: () => {return "/bloodbags/blood-bag-62.5.png";}},
          {min: 65.1,max: 69.9, action: () => {return "/bloodbags/blood-bag-67.5.png";}},
          {min: 70.1,max: 74.9, action: () => {return "/bloodbags/blood-bag-72.5.png";}},
          {min: 75.1,max: 79.9, action: () => {return "/bloodbags/blood-bag-77.5.png";}},
          {min: 80.1,max: 84.9, action: () => {return "/bloodbags/blood-bag-82.5.png";}},
          {min: 85.1,max: 89.9, action: () => {return "/bloodbags/blood-bag-87.5.png";}},
          {min: 90.1,max: 94.9, action: () => {return "/bloodbags/blood-bag-92.5.png";}},
          {min: 95.1,max: 99.9, action: () => {return "/bloodbags/blood-bag-97.5.png";}},
        ];

        // Encontra o intervalo correspondente a qttStock
        const interval = intervals.find(
          ({ min, max }) => qttStock >= min && qttStock <= max
        );

        // Executa a ação correspondente, se encontrada
        if (interval) {
          const result = interval.action(); // Captura o resultado da função de ação
          return result;
        } else {
          return "";
        }

        break;
    }
  };

  const formatPhone = (phone: string) => {
    phone = phone
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
    return phone;
  };

  return (
    <div>
      <MapContainer
        className="map-container"
        center={[-8.0476, -34.877]}
        zoom={12}
        style={{ height: "500px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers}
      </MapContainer>
      <div className="bloodstock-container">
        {bloodcenters.map((center) => (
          <div
            key={center.id}
            id={center?.id.toString()}
            className={`bloodstock-box ${
              selectedCenter === center.id.toString() ? "selected" : ""
            }`}
          >
            <h3 className="bloodstock-title">{center.name}</h3>
            <div style={{display: "flex", width:"100%"}}>
              <div className="topics">
                <p><span>Endereço:</span> <label>{center.address}</label></p>
                <p><span>Telefone:</span> <label>{formatPhone(center.phone)}</label></p>
                <p><span>Email:</span> <label>{center.email}</label></p>
                <p><span>Referência:</span> <label>{center.referencePoint}</label></p>
              </div>
            </div>

            <div className="arrow-container">
              {!selectedCenter || selectedCenter !== center.id.toString() ? (
                <>
                  <label className="more-info" onClick={() => toggleSelected(center.id.toString())}>Informações do estoque sanguíneo<img src="/gota-de-sangue.png"></img></label>
                  <IoIosArrowDown
                    className="arrow"
                    onClick={() => toggleSelected(center.id.toString())}
                  />
                </>
              ) : (
                <>
                  <label className="more-info" onClick={() => toggleSelected(center.id.toString())}>Informações do estoque sanguíneo<img src="/gota-de-sangue.png"></img></label>
                  <IoIosArrowUp
                    className="arrow"
                    onClick={() => toggleSelected(center.id.toString())}
                  />
                </>
              )}
            </div>
            {selectedCenter === center.id.toString() && (
              <div style={{backgroundColor: " #f8f8f8"}}>
                {bloodstocks.find((stock) => stock.bloodcenter === center.id) ? (
                  <div className="types-container">
                    <div className="type-info">
                      <label>A-</label>
                      <img src={UrlGenerator(parseFloat(bloodstocks.find((stock) => stock.bloodcenter === center.id)!.a_negative))!} alt="Tipo A-" />
                    </div>
                    <div className="type-info">
                      <label>A+</label>
                      <img src={UrlGenerator(parseFloat(bloodstocks.find((stock) => stock.bloodcenter === center.id)!.a_positive))!} alt="Tipo A+" />
                    </div>
                    <div className="type-info">
                      <label>B-</label>
                      <img src={UrlGenerator(parseFloat(bloodstocks.find((stock) => stock.bloodcenter === center.id)!.b_negative))!} alt="Tipo B-" />
                    </div>
                    <div className="type-info">
                      <label>B+</label>
                      <img src={UrlGenerator(parseFloat(bloodstocks.find((stock) => stock.bloodcenter === center.id)!.b_positive))!} alt="Tipo B+" />
                    </div>
                    <div className="type-info">
                      <label>AB-</label>
                      <img src={UrlGenerator(parseFloat(bloodstocks.find((stock) => stock.bloodcenter === center.id)!.ab_negative))!} alt="Tipo AB-" />
                    </div>
                    <div className="type-info">
                      <label>AB+</label>
                      <img src={UrlGenerator(parseFloat(bloodstocks.find((stock) => stock.bloodcenter === center.id)!.ab_positive))!} alt="Tipo AB+" />
                    </div>
                    <div className="type-info">
                      <label>O-</label>
                      <img src={UrlGenerator(parseFloat(bloodstocks.find((stock) => stock.bloodcenter === center.id)!.o_negative))!} alt="Tipo O-" />
                    </div>
                    <div className="type-info">
                      <label>O+</label>
                      <img src={UrlGenerator(parseFloat(bloodstocks.find((stock) => stock.bloodcenter === center.id)!.o_positive))!} alt="Tipo O+" />
                    </div>
                  </div>
                ) : (
                  <div className="types-container">
                    <p>Estoque sanguíneo não disponível no sistema!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="about-bloodstock">
        <fieldset>
          <legend>IMPORTÂNCIA DO ESTOQUE SANGUÍNEO</legend>
        </fieldset>
        <p>O estoque sanguíneo é a vida pulsante por trás de cada emergência médica, cirurgia ou tratamento. É a dádiva preciosa que conecta doadores altruístas a pacientes necessitados, transformando vidas em momentos de desespero. Cada doação de sangue representa uma promessa de esperança e cura para aqueles que enfrentam desafios de saúde.</p>
        <p>A doação de sangue é um ato de pura generosidade que transcende fronteiras e diferenças. Ao doar sangue, você se torna um elo vital na corrente da vida, oferecendo uma oportunidade única para salvar vidas e fazer a diferença na comunidade. Seu gesto altruísta não apenas fornece um recurso essencial, mas também transmite uma mensagem poderosa de compaixão e apoio mútuo.</p>
        <p>Manter um estoque sanguíneo robusto é crucial para garantir que os pacientes recebam os cuidados de que precisam, quando precisam. Emergências médicas, complicações durante o parto, cirurgias complexas - todas essas situações exigem um suprimento constante de sangue seguro e compatível. Portanto, cada doação é uma contribuição valiosa para sustentar essa reserva vital de esperança.</p>
      </div>
    </div>
  );
};

export default Map;
