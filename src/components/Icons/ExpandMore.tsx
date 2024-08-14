import { SVGAttributes, VFC } from "react"

export const ExpandMore: VFC<SVGAttributes<SVGElement>> = (props) => (
  <svg
    data-token-name="ExpandMore"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
    viewBox="0 0 12 8"
  >
    <path d="M10.59 0.589844L6 5.16984L1.41 0.589844L0 1.99984L6 7.99984L12 1.99984L10.59 0.589844Z" />
  </svg>
)
