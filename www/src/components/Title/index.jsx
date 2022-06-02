import { h } from "preact";

export default function Title(props) {
  const { title, description } = props;

  return (
    <div class="title">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
