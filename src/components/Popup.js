import { Fab } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import React from "react";
import { useRecoilState } from "recoil";
import { PopupState } from "../atoms/Users";
import "../styles/Popup.css";

const Popup = (props) => {
  const [Pop, setPop] = useRecoilState(PopupState);

  return (
    props.show && (
      <div className="popup card">
        <div className="card-content" style={{ marginTop: -10 }}>
          <Fab
            onClick={() => setPop(null)}
            style={{ marginRight: 10 }}
            color="primary"
          >
            <Cancel />
          </Fab>
          <span>{props.text}</span>
        </div>
      </div>
    )
  );
};

export default Popup;
