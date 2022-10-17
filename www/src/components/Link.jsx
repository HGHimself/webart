import { h } from "preact";

export default function Link(props) {
  const { href, children } = props;

  return (
    <a href={href} className="away" rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}
