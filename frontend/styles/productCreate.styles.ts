import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Modal } from "antd";
import DaumPostcode from "react-daum-postcode";
export const AddressModal = styled(Modal)``;
// responsive
export const responsiveBtnAddress = css`
@media screen and (max-width: 767px) {
  width: 50%;
`;
export const AddressSearchInput = styled(DaumPostcode)``;
export const ButtonAddress = styled.button`
  background: #000;
  box-sizing: border-box;
  color: #fff;
  width: 20%;
  margin-top: 20px;
  height: 40px;
  border: none;
  border-radius: 30px;
  ${responsiveBtnAddress}
`;
