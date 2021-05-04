import React from "react";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import reactCSS from "reactcss";

const YoutubeCounterButton = ({
  position,
  number,
  hover,
  tooltip,
  onClick,
  active,
  activeColor,
  type
}) => {
  const styles = reactCSS(
    {
      default: {
        button: {
          display: "flex",
          alignItems: "center",
          fontFamily: "Roboto,arial,sans-serif",
          fontSize: "11px",
          opacity: "0.5",
          cursor: "pointer",
          position: "relative"
        },
        tooltip: {
          color: "#fff",
          background: "rgba(0,0,0,0.8)",
          borderRadius: "3px",
          padding: "5px 8px",
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "4px",
          whiteSpace: "nowrap",
          opacity: "0",
          transition: "opacity 0.1s ease-in-out"
        }
      },
      hover: {
        button: {
          opacity: "0.7"
        },
        tooltip: {
          opacity: "1"
        }
      },
      active: {
        button: {
          opacity: "1"
        }
      }
    },
    { hover, active }
  );

  return (
    <div style={styles.button} onClick={onClick}>
      <div style={{ marginRight: "7px" }}>
        {type === "like" ? (
          <MdThumbUp size="17px" />
        ) : (
          <MdThumbDown size="17px" />
        )}
      </div>
      {parseInt(number, 10).toLocaleString()}
      <div style={styles.tooltip}>{tooltip}</div>
    </div>
  );
};

export default YoutubeCounterButton