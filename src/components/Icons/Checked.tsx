import { SVGAttributes, VFC } from "react"

export const Checked: VFC<SVGAttributes<SVGElement>> = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 12 10"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    data-token-name="Checked"
    {...props}
  >
    <path d="M4 7.17008L10.59 0.580078L12 2.00008L4 10.0001L0 6.00008L1.41 4.59008L4 7.17008Z" />
  </svg>
)
