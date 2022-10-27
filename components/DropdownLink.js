import Link from "next/link";

export default function DropdownLink(props) {
    const {href, children, rest} = props
    return (
        <Link className="" href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
}