import { Col, Container, Row } from "react-bootstrap";
import "./TokenomicsSec.scss";
import CommonHeading from "@/common/CommonHeading/CommonHeading";
import Graph from "./Graph";
import { useState } from "react";
const TokenomicsSec = () => {
  const [active, setActive] = useState<null | string>(null);
  const [width, setWidth] = useState(window.document.body.clientWidth);

  const tokenomicsData = [
    {
      title: "Ozolio",
      subtitle: "Coin Name",
    },
    {
      title: "18",
      subtitle: "Decimal",
    },
    {
      title: "200 Million",
      subtitle: "Max. Tokens Supply",
    },
    {
      title: "100 Million",
      subtitle: "Total Tokens to Allocate",
    },
    {
      title: "OZOT",
      subtitle: "Symbol",
    },
  ];
  const tokenomics = [
    {
      className: "one",
      percentage: "5%",
      title: "Airdrop",
      showLine: true,
    },
    {
      className: "ten",
      percentage: "1%",
      title: "Pre-Sale 1",
    },
    {
      className: "nine",
      percentage: "2%",
      title: "Pre-Sale 2",
    },
    {
      className: "eight",
      percentage: "5%",
      title: "Pre-Sale 3",
    },
    {
      className: "seven",
      percentage: "10%",
      title: "Main Sale",
    },
    {
      className: "six",
      percentage: "15%",
      title: "Team",
      showLine: true,
    },
    {
      className: "two",
      percentage: "30%",
      title: "Rewards",
      showLine: true,
    },
    {
      className: "three",
      percentage: "25%",
      title: "Treasury",
      showLine: true,
    },
    {
      className: "four",
      percentage: "4%",
      title: "Partners",
    },
    {
      className: "five",
      percentage: "3%",
      title: "Advisors",
    },
  ];
  return (
    <>
      <section className="tokenomics_sec" id="Tokenomics">
        <Container>
          <div className="same_content_sec text-center mw-100">
            <div data-text="Tokenomics" className="stroke_text"></div>
            <CommonHeading heading="Tokenomics" />
          </div>
          <div className="tokenomics_sec_in">
            <Row>
              <Col xl={7} md={12}>
                <div className="tokenomics">
                  <ul>
                    {tokenomics
                      .slice(0, width > 767 ? 6 : 5)
                      .map((item, index) => {
                        return (
                          <li key={index}>
                            <div
                              className={`graph_data ${item.showLine ? "line" : ""} ${active === `cell-${item.className}` ? "active" : ""} ${item.className}`}
                            >
                              <h2>{item.percentage}</h2>
                              <h3>{item.title}</h3>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="tokenomics_graph">
                    <Graph
                      onMouseEnter={(e) => {
                        setActive(e.currentTarget.id);
                      }}
                      onMouseLeave={() => {
                        setActive(null);
                      }}
                    />
                    <div className="tokenomics_graph_circle">
                      <div className="chart_content">
                        <p>Total Allocation</p>
                        <h2>100%</h2>
                      </div>
                    </div>
                  </div>
                  <ul>
                    {tokenomics
                      .slice(width > 767 ? 6 : 5)
                      .map((item, index) => {
                        return (
                          <li key={index}>
                            <div
                              className={`graph_data ${item.showLine ? "line" : ""} ${active === `cell-${item.className}` ? "active" : ""} ${item.className}`}
                            >
                              <h2>{item.percentage}</h2>
                              <h3>{item.title}</h3>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </Col>
              <Col xl={5} md={12}>
                <div className="tokenomics_content">
                  <div className="tokenomics_cards">
                    <ul>
                      {tokenomicsData.map((item, index) => {
                        return (
                          <li key={index}>
                            <div>
                              <h2>{item.title}</h2>
                              <p>{item.subtitle}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {/* <div className="distribution_txn">
                    <h3>Distribution of Txn Fee</h3>
                    <div className="distribution_txn_btns">
                      <Button
                        text={
                          <>
                            90% <span>Validator & Delegator</span>
                          </>
                        }
                        className="validator_btn"
                      />
                      <Button
                        text={
                          <>
                            10% <span>Treasury</span>
                          </>
                        }
                        className="treasury_btn"
                      />
                    </div>
                  </div> */}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default TokenomicsSec;
