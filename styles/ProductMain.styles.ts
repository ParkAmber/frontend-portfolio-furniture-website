import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Rate, Modal } from "antd";
export interface IStarRateProps {
  active?: boolean;
}
export interface IClickButtonProps {
  isClickedpage?: boolean;
}
// responsive
export const responsiveStar = css`
@media screen and (max-width: 767px) {
padding-left:20px;
`;
export const StarWrapperFetch = styled.div`
  display: flex;
  padding-left: 60px;
  ${responsiveStar}
`;
export const TempStarFetch = styled.div`
  width: 15px;
  height: 15px;
  background-image: url(${(props: IStarRateProps) =>
    props.active ? "/star_yellow.png" : "/star_grey.png"});
  background-position: center;

  background-repeat: no-repeat;
  // border: solid 1px #000;
`;
export const ButtonCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 60px;
`;
export const Button2 = styled.button`
  width: 30px;
  height: 30px;
  color: ${(props: IClickButtonProps) =>
    props.isClickedpage ? "red" : "#000"};
  background: ${(props: IClickButtonProps) =>
    props.isClickedpage ? "green" : ""};
  text-decoration: ${(props: IClickButtonProps) =>
    props.isClickedpage ? "underline" : "none"};
  border: none;
  background: none;
  cursor: pointer;
`;
export const ContentsArea = styled.textarea`
  width: 100%;
  min-height: 108px;
  padding: 20px;
  border: 1px solid lightgray;
  // border-bottom: 1px solid lightgray;
`;
export const PasswordModal = styled(Modal)``;
