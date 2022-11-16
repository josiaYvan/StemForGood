import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { PopupState } from "../atoms/Users";
import hash from "../services/hash";
import "../styles/Form.css";

const Form = () => {
  const [formSubmti, setFormSubmti] = useState(false);
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [Tel, setTel] = useState("");
  const [Adress, setAdress] = useState("");
  const [Ville, setVille] = useState("");
  const [Activite, setActivite] = useState("");
  const [payment, setPayment] = useState("");
  const [lastpayment, setLastpayment] = useState("");
  const [Photo, setPhoto] = useState();
  const [qr, setQr] = useState("");

  const history = useHistory();
  const [Pop, setPop] = useRecoilState(PopupState);

  const handleRegIster = async (e) => {
    e.preventDefault();
    const ID = hash(date + Adress);
    setQr(ID);
    const d = new Date();

    console.log(Photo);
    await axios({
      method: "post",
      url: "https://eorfhj2o3yyxx0y.m.pipedream.net",
      data: {
        datetime:
          d.getDate() +
          "/" +
          d.getMonth() +
          "/" +
          d.getFullYear() +
          " " +
          d.getHours() +
          ":" +
          d.getMinutes(),
        email,
        firstname: Nom,
        lastname: Prenom,
        photo: "photo",
        birthdate: date,
        phone: Tel,
        address: Adress,
        city: Ville,
        activity: Activite,
        payment,
        lastpayment,
        ID: qr,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPop({
          text: `${(Prenom, Nom)} est inscrit(e) ☻`,
          show: true,
        });
        setTimeout(() => {
          setPop(null);
        }, 5000);
        history.push("/");
      })
      .catch((err) => {
        alert("Veuillez réessayer!");
        console.log(err);
      });
  };

  return (
    <div>
      {" "}
      <h2>Inscription</h2>
      <form action="" onSubmit={handleRegIster}>
        <div className="row">
          <div className="col s12 l6">
            <div className="input-field">
              <input
                required
                type="text"
                name="Prénoms"
                onChange={(e) => setPrenom(e.target.value)}
                value={Prenom}
                id="email"
              />
              <label htmlFor="Prénoms">Prénoms</label>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="input-field">
              <input
                required
                type="text"
                name="Nom de famille
"
                onChange={(e) => setNom(e.target.value)}
                value={Nom}
                id="email"
              />
              <label htmlFor="email">Nom de famille</label>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="input-field">
              <input
                type="file"
                name="Photo d'identité"
                //  accept="image/png, image/jpg, image/jpeg"
                id="email"
                onChange={(e) => setPhoto(e.target.files)}
                value={Photo}
              />
              <label htmlFor="Photo d'identité">Photo d'identité</label>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="input-field">
              <input
                required
                type="date"
                name="date"
                id="date"
                className="datepicker"
              />
              <label htmlFor="date">Date de naissance</label>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="input-field">
              <input
                required
                type="text"
                name="Adresse email"
                id="email"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
              <label htmlFor="email">Adresse email</label>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="input-field">
              <input
                required
                type="text"
                name="Numéro de téléphone"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label htmlFor="email">Numéro de téléphone</label>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="input-field">
              <input
                required
                type="text"
                name="Adresse domicile"
                id="email"
                onChange={(e) => setTel(e.target.value)}
                value={Tel}
              />
              <label htmlFor="email">Adresse domicile</label>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="input-field">
              <input
                required
                type="text"
                name="Ville"
                onChange={(e) => setAdress(e.target.value)}
                value={Adress}
                id="email"
              />
              <label htmlFor="email">Ville</label>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="input-field">
              <input
                required
                type="text"
                name="Activité"
                onChange={(e) => setVille(e.target.value)}
                value={Ville}
                id="email"
              />
              <label htmlFor="email">Activité</label>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="input-field">
              <input
                required
                type="text"
                name="payment"
                onChange={(e) => setPayment(e.target.value)}
                value={payment}
                id="email"
              />
              <label htmlFor="email">Activité</label>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="input-field">
              <input
                type="text"
                name="lastpayment"
                onChange={(e) => setLastpayment(e.target.value)}
                value={lastpayment}
                id="email"
              />
              <label htmlFor="email">Activité</label>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="input-field">
              <input type="text" name="qrcode" id="email" value={qr} readOnly />
              <label htmlFor="email">Identifiant</label>
            </div>
          </div>
          <button type="submit" className="btn indigo">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
