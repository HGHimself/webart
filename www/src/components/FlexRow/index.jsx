import { h } from "preact";
import style from "./style.css";

export default function FlexRow(props) {
  const styles = ["flex"];

  if (props.flex) {
    const flex =
      props.flex == "space-between"
        ? "justify-between"
        : props.flex == "space-around"
        ? "justify-around"
        : props.flex == "space-end"
        ? "justify-end"
        : props.flex == "space-start"
        ? "justify-start"
        : "";

    styles.push(flex);
  }

  if (props.content) {
    const content = props.content == "center" ? "content-center" : "";

    styles.push(content);
  }

  if (props.align) {
    const align = props.align == "center" ? "items-center" : "";

    styles.push(align);
  }

  if (props.direction) {
    const direction =
      props.direction == "column"
        ? "direction-column"
        : props.direction == "row"
        ? "direction-row"
        : "";

    styles.push(direction);
  }

  if (props.wrap) {
    const wrap = props.wrap == "wrap" ? "wrap" : "";

    styles.push(wrap);
  }
  return <div class={styles.join(" ")}>{props.children}</div>;
}
