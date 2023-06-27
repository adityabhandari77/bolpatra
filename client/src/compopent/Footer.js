import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBFooter,
  MDBIcon,
  MDBBtn,
} from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="default-color" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="4">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="2">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Follow us!</h5>
            <MDBBtn size="md" social="fb" color="white">
              <MDBIcon fab icon="facebook-f" color="black" size="lg" />
            </MDBBtn>
            <MDBBtn size="md" social="tw" color="white">
              <MDBIcon fab icon="twitter" color="black" size="lg" />
            </MDBBtn>
            <MDBBtn size="md" social="li" color="white">
              <MDBIcon fab icon="linkedin-in" color="black" size="lg" />
            </MDBBtn>
            <MDBBtn size="md" social="ins" color="white">
              <MDBIcon fab icon="instagram" color="black" size="lg" />
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} <a href="#!"> BPOnline.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
