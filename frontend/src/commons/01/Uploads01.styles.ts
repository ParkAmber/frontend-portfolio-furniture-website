import { css } from "@emotion/react";
import styled from "@emotion/styled";
// responsive
export const responsiveBtnUpload = css`
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 100px;
    margin-right: 4px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 150px;
    height: 150px;
    background: #7b7b7b;
    margin-right: 40px;
  }
`;
export const responsiveBtnImage = css`
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 100px;
    margin-right: 4px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 150px;
    height: 150px;
    background: #7b7b7b;
    margin-right: 40px;
  }
`;
export const UploadImage = styled.img`
  width: 200px;
  height: 200px;
  margin-right: 24px;
  cursor: pointer;
  ${responsiveBtnImage}
`;

export const UploadButton = styled.button`
  width: 200px;
  height: 200px;
  background-color: #bdbdbd;
  margin-right: 24px;
  outline: none;
  border: none;
  cursor: pointer;
  ${responsiveBtnUpload}
`;

export const UploadFileHidden = styled.input`
  display: none;
`;
