import React from "react";
import { useRecoilState } from "recoil";
import { UserState } from "../atoms/Users";
import "../styles/Accueil.css";

export default function Accueil() {
  const [User] = useRecoilState(UserState);

  return (
    <div className="container">
      <div className="container ">
        <div
          className="card accueil"
          style={{ padding: "50px", marginTop: "2em" }}
        >
          <h2 className="center">Mon compte</h2>
          <label>Nom</label>
          <p>{User[3] + " " + User[2]}</p>
          <label>Activité</label>
          <p>{User[10]}</p>{" "}
          <label>Dernière date de paiement de cotisation</label>
          <p>{User[12]}</p>{" "}
        </div>
      </div>
    </div>
  );
}

// eo le izy
// actualisena le page de miala le recoil
// le USER
