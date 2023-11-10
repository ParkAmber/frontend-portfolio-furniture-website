import styled from "@emotion/styled";
import { css } from "@emotion/react";
export interface ITextProps {
  isWhiteText?: boolean;
}
export interface IStarRateProps {
  active?: boolean;
}
export const responsiveStar = css`
@media screen and (max-width: 767px) {
padding-left:20px;
`;
// responsive
export const responsiveHeader = css`
  @media screen and (max-width: 767px) {
    padding: 15px;
    grid-template-columns: 1fr 3fr 2fr;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    padding: 25px;
    grid-template-columns: 1fr 3fr 2fr;
  }
  @media screen and (min-width: 1024px) and (max-width: 1400px) {
    padding: 45px;
    grid-template-columns: 1fr 3fr 2fr;
  }
`;

export const responsiveProfile = css`
  @media screen and (max-width: 767px) {
    margin-left: 0px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 0px;
  }
`;
export const responsiveProfileUl = css`
  @media screen and (max-width: 767px) {
    justify-content: space-between;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    justify-content: space-evenly;
  }
`;

export const WebsiteMainHeader = styled.div`
  padding: 0 320px;
  height: 100px;
  //   border: 2px solid red;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: repeat(1, 100px);
  grid-gap: 5px;
  align-items: center;
  justify-content: center;
  background: ${(props: ITextProps) =>
    props.isWhiteText ? "#0A0603" : "#fff"};

  ${responsiveHeader}
`;
export const WebsiteMainHeaderList = styled.ul`
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
`;
export const WebsiteMainHeaderListProfile = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  ${responsiveProfileUl}
`;
export const WebsiteMainHeaderA = styled.a`
  color: ${(props: ITextProps) => (props.isWhiteText ? "#fff" : "#0A0603")};
  text-decoration: none;
  list-style-type: none;
`;
export const WebsiteMainHeaderLi = styled.li`
  color: ${(props: ITextProps) => (props.isWhiteText ? "#fff" : "#0A0603")};
  text-decoration: none;
  list-style-type: none;
`;
export const WebsiteMainHeaderLiProfile = styled.li`
  margin-left: 60px;
  color: ${(props: ITextProps) => (props.isWhiteText ? "#fff" : "#0A0603")};
  text-decoration: none;
  list-style-type: none;
  ${responsiveProfile}
`;

export const StarWrapperFetch = styled.div`
  display: flex;
  padding-top: 20px;
`;
export const TempStarFetch = styled.div`
  width: 15px;
  height: 15px;
  margin: 2px;
  background-image: url(${(props: IStarRateProps) =>
    props.active ? "/staryellow.png" : "/stargrey.png"});
  background-position: center;

  background-repeat: no-repeat;
  // border: solid 1px #000;
  // border: 2px solid blue;
`;
