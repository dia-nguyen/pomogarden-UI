import React, { useState, useContext } from "react";
import "./style.scss";
import GardenAPI from "../../api";
import userContext from "../../userContext";
import "../Cursor";
import Cursor from "../Cursor";
import Plot from "./Plot";

function Garden() {
  const { user, setUser } = useContext(userContext);
  const [canInteract, setCanInteract] = useState(false);
  const [cursorClass, setCursorClass] = useState("");

  async function updatePlant(plotId, action) {
    let res;
    if (action === "sow") {
      res = await GardenAPI.sowPlant(plotId);
    } else if (action === "plant") {
      res = await GardenAPI.plantPlant(plotId);
    } else if (action === "water") {
      res = await GardenAPI.waterPlant(plotId);
    } else if (action === "sell") {
      res = await GardenAPI.sellPlant(plotId);
    }
    setUser({
      data: {
        ...user,
        plants: res.plants,
      },
      isLoading: false,
    });
  }

  function handleCursorClass(event) {
    const buttonId = event.target.id;
    setCursorClass(buttonId);
  }


  function generateGarden() {
    const plotElements = user.plants.map((plot) => {

      if (plot.status === "empty") {
        return (
          <Plot
            key={plot.id}
            location={plot.location}
            state={plot.status}
            event={() => updatePlant(plot.id, "sow")}
            mouseEnter={handleCursorClass}
            mouseLeave={() => setCursorClass("")}
          />
        );

      } else if (plot.status === "sowed") {
        return (
          <Plot
            key={plot.id}
            location={plot.location}
            classes="sowed"
            state={plot.status}
            event={() => updatePlant(plot.id, "plant")}
            mouseEnter={handleCursorClass}
            mouseLeave={() => setCursorClass("")}
          />
        );

      } else if (
        plot.status === "planted" ||
        (plot.status === "thirsty" && plot.age !== "ripe")
      ) {
        return (
          <Plot
            key={plot.id}
            location={plot.location}
            classes="planted sowed"
            state="thirsty"
            event={() => updatePlant(plot.id, "water")}
            mouseEnter={handleCursorClass}
            mouseLeave={() => setCursorClass("")}
            name={plot.name}
            age={plot.age}
            sprite={plot.current_sprite}
          />
        );

      } else if (plot.age === "ripe") {
        return (
          <Plot
            key={plot.id}
            location={plot.location}
            classes="sowed"
            state="ready-to-sell"
            event={() => updatePlant(plot.id, "sell")}
            mouseEnter={handleCursorClass}
            mouseLeave={() => setCursorClass("")}
            name={plot.name}
            age={plot.age}
            sprite={plot.current_sprite}
          />
        );

      } else {
        return (
          <Plot
            key={plot.id}
            location={plot.location}
            classes="sowed watered"
            state={plot.status}
            mouseEnter={handleCursorClass}
            mouseLeave={() => setCursorClass("")}
            name={plot.name}
            age={plot.age}
            sprite={plot.current_sprite}
          />
        );
      }
    });

    return (
      <>
        <Cursor cursorClass={cursorClass} />
        <div className="garden-wrapper w-[50em] h-[36.5em]">
          <div className="plot-wrapper">{plotElements}</div>
          <img
            src="https://pomogarden.s3.us-west-1.amazonaws.com/field.png"
            alt="field"
            className="field w-[50em]"
          />
        </div>
      </>
    );
  }

  return <div className="garden-container">{generateGarden()}</div>;
}

export default Garden;
