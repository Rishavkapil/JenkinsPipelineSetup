import { useRouter } from "next/navigation";
import React from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import "./CustomNote.scss";

const CustomNote = () => {
  const router = useRouter();
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Alert variant="info" className="text-center">
            <h5 className="mb-3">Note :-</h5>
            <p>
              Make sure all your personal details (First name, Last name and
              DOB) are as per your document.
            </p>
            <p className="mb-0">
              If you need help, feel free to{" "}
              <span
                onClick={() => router.push("/contact")}
                className="contact_us_link"
              >
                contact us
              </span>
              .
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomNote;
