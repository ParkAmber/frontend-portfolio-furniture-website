import styled from "@emotion/styled";
const Wrapper = styled.div`
  height: 50px;
  background-color: grey;
`;
export default function LayoutFooter(): JSX.Element {
  return (
    <>
      <section className='footer-section'>
        <div className='footer-section-left'>
          <div>
            <ul>
              <li>Company</li>
              <li>License</li>
              <li>Policy</li>
              <li>FAQ</li>
              <li style={{ color: "purple" }}>Contact</li>
            </ul>
          </div>
          <div>
            <p>
              <span>Amber Front-End Developer</span>
            </p>
            <p>
              Privacy Policy &nbsp; &nbsp; &nbsp; |&nbsp; &nbsp; &nbsp; Canada{" "}
            </p>
            <p>
              Phone: (437)-249-3569 &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp;
              E-mail: hayoung.p12@gmail.com
            </p>
          </div>
          <div>
            <p>
              <span>Privacy Policy</span>
            </p>
            <p>
              Rob works with executives, business leaders, and their teams with
            </p>
            <p>&copy; All rights Reserved 2023, Amber Developer</p>
          </div>
        </div>
        <div className='footer-section-right'>
          <div>
            <p>
              Customer Service &nbsp; ▼ &nbsp; &nbsp; &nbsp; Partners &nbsp; ▼
            </p>
          </div>
          <div>
            <p>
              <span>Customer Service: 1234-1234</span>
            </p>
            <p>Business Hour: 09:00 ~ 18:00</p>
            <p>
              Rob works with executives, business leaders, and their teams with
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
