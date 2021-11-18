import React from "react";
import { css } from "@emotion/css";

export default function FlexRow(props) {
  const flexRow = css`
    display: flex;
    justify-content: ${props.flex};
    align-content: ${props.content};
    align-items: ${props.align};
    flex-direction: ${props.direction};
    flex-wrap: ${props.wrap};
    width: ${props.width};
    height: ${props.height};
    overflow-y: ${props.overflowY};
  `;

  return <div className={flexRow}>{props.children}</div>;
}
