import React from "react";
import { css } from "@emotion/css";

export default function FlexRow(props) {
  const flexRow = css`
    display: flex;
    justify-content: ${props.flex};
    align-items: ${props.align};
    flex-direction: ${props.direction};
    flex-wrap: ${props.wrap ? props.wrap : "wrap"};
  `;

  return <div className={flexRow}>{props.children}</div>;
}
