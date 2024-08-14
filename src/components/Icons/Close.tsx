import { SVGAttributes, VFC } from "react"

export const Close: VFC<SVGAttributes<SVGElement>> = (props) => (
  <svg
    data-token-name="Close"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
    viewBox="0 0 20 20"
  >
    <path d="M19.33 2.55 17.45.67 10 8.12 2.55.67.67 2.55 8.12 10 .67 17.45l1.88 1.88L10 11.88l7.45 7.45 1.88-1.88L11.88 10l7.45-7.45Z" />
  </svg>
)
