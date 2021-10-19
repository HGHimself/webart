import React from "react";
import { css } from "@emotion/css";

export default function Footer(props) {
  const { versionData } = props;

  const footerStyle = css`
    margin-top: 48px;
    border-top: 1px solid black;
  `;

  if (!versionData) {
    return <></>;
  }

  return (
    <div className={footerStyle}>
      <p style={{ textAlign: "center" }}>
        v{versionData.version}&nbsp;|&nbsp;Data updated {versionData.date}
        &nbsp;|&nbsp;Calculations and
        presentation by{" "}
        <a href="https://github.com/HGHimself/webart">HG King</a>
        &nbsp;|&nbsp;Made in Astoria
      </p>
    </div>
  );
}
