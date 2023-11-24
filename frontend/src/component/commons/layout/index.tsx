import { useRouter } from "next/router";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNav from "./navigation";

const productIDPattern = /\/detail\/.+/;
const HIDDEN_HEADERS = [
  "/designer/products/",
  "/designer/products/new/",
  "/weather/",
  "/portfolio/",
  "/",
  productIDPattern.source, // Use the regular expression source to match any product ID
  // Add other paths as needed
];
// Create a function to check if a path should be hidden
const isHiddenPath = (path: string) =>
  HIDDEN_HEADERS.some((pattern) => new RegExp(pattern).test(path));


interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);
  const isHiddenHeader2 = isHiddenPath(router.asPath);
  console.log(isHiddenHeader,router.asPath,isHiddenHeader2);
  return (
    <>
      {!isHiddenHeader ? (
        <>
          <LayoutHeader />
          {/* <LayoutBanner /> */}
          {/* <LayoutNav /> */}
          <div>{props.children}</div>
          <LayoutFooter />{" "}
        </>
      ) : (
        <div>{props.children}</div>
      )}
    </>
  );
}
