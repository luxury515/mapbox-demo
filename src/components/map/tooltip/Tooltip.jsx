import React from "react";

const Tooltip = ({ feature }) => {
  const { id } = feature.properties;
  console.log({ id });
  return (
    <div id={`tooltip-${id}`}>
      <strong>소스레어:</strong> {feature.layer["source-layer"]}
      <br />
      <strong>레어 ID:</strong> {feature.layer.id}
    </div>
  );
};

export default Tooltip;
