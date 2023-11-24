import styled from "@emotion/styled";

export const Column = styled.span`
  margin: 0px 50px;
`;

interface IPageProps {
  isActive?: boolean;
}
export const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
`;
export const Page = styled.span`
  margin: 0px 10px;
  padding: 10px;
  color: ${(props: IPageProps) => (props.isActive ? "black" : "#7b7b7b")};
  // font-weight: ${(props: IPageProps) =>
    props.isActive ? "bold" : "normal"};
  cursor: ${(props: IPageProps) => (props.isActive ? "none" : "pointer")};
  border: ${(props: IPageProps) =>
    props.isActive ? "1px solid #7b7b7b" : "none"};
  border-radius: ${(props: IPageProps) => (props.isActive ? "100%" : "none")};
  width: 16px;
  height: 16px;
  text-align: center;
`;
