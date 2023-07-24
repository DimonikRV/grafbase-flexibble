import { FC } from "react";
import Link from "next/link";

interface IFooterColumnProps {
  title: string;
  links: Array<string>;
}
export const FooterColumn: FC<IFooterColumnProps> = ({ title, links }) => {
  return (
    <div className="footer-column">
      <h4 className="font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2 font-normal">
        {links.map((link) => (
          <Link href="/" key={link}>
            {link}
          </Link>
        ))}
      </ul>
    </div>
  );
};
