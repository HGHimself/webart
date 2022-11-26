import { h } from "preact";

export default function Title(props) {
  const { title, description, ...other } = props;

  return (
    <div {...other}>
      <h2 class="title">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
