import { h } from "preact";

export default function Swatch(props) {
  const { color, name, text } = props;

  return (
    <div
      style={`background-color: ${color}; width: 100px; height: 100px; padding: 6px;`}
    >
      <h6 style={`color: ${text}`}>{color}</h6>
    </div>
  );
}
