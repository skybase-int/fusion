import React from 'react';
import styled from '@emotion/styled';

interface Props {
  breakdown?: boolean;
}

export const TransparencyEmptyTable = ({ breakdown = false }: Props) => {
  return (
    <>
      <Wrapper>
        {!breakdown
          ? (
          <Container>
            <Row>
              <CellBlock
                style={{
                  marginRight: '111px',
                }}
              />
              <CellBlock />
              <CellBlock />
              <CellBlock />
              <CellBlock />
              <CellBlock />
            </Row>
            <Line />
            {new Array(3).fill('').map((_, i) => (
              <Row key={`key-${i}`} style={{ marginBottom: i === 2 ? '17px' : '30px' }}>
                <Row
                  style={{
                    gap: '0',
                    maxWidth: '238px',
                  }}
                >
                  <CellBlock
                    style={{
                      borderRadius: '50%',
                      minWidth: '42px',
                      maxWidth: '42px',
                      height: '42px',
                      marginRight: '5px',
                    }}
                  />
                  <div
                    style={{
                      marginRight: '20px',
                      maxWidth: '126px',
                      minWidth: '126px',
                      width: '100%',
                    }}
                  >
                    <CellBlock
                      style={{
                        height: '22px',
                        marginBottom: '6px',
                        marginRight: '0',
                      }}
                    />
                    <CellBlock
                      style={{
                        height: '16px',
                        marginRight: '0',
                      }}
                    />
                  </div>
                </Row>
                <CellBlock />
                <CellBlock />
                <CellBlock />
                <CellBlock />
                <CellBlock
                  style={{
                    maxWidth: '262px',
                  }}
                />
              </Row>
            ))}
            <Row>
              <CellBlock
                style={{
                  marginRight: '111px',
                }}
              />
              <CellBlock />
              <CellBlock />
              <CellBlock />
              <CellBlock />
              <CellBlock
                style={{
                  maxWidth: '262px',
                }}
              />
            </Row>
          </Container>
            )
          : (
          <Container>
            <Row>
              <CellBlock
                style={{
                  maxWidth: '137px',
                  minWidth: '137px',
                  marginRight: '151px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '105px',
                  marginRight: '55px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '106px',
                  marginRight: '54px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '105px',
                  marginRight: '21px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '109px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '109px',
                  marginRight: '188px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '126px',
                }}
              />
            </Row>
            <Line />
            <Row style={{ marginBottom: '26px' }}>
              <CellBlock
                style={{
                  maxWidth: '230px',
                  height: '20px',
                }}
              />
            </Row>
            <Row
              style={{
                justifyContent: 'space-between',
                marginBottom: '34px',
              }}
            >
              <CellBlock
                style={{
                  maxWidth: '137px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '190px',
                }}
              />
            </Row>

            <Row
              style={{
                marginBottom: '4px',
              }}
            >
              <CellBlock
                style={{
                  maxWidth: '230px',
                  height: '20px',
                }}
              />
            </Row>

            <Row
              style={{
                marginBottom: '10px',
              }}
            >
              <CellBlock
                style={{
                  width: '79px',
                  height: '20px',
                }}
              />
            </Row>

            <Row style={{ marginBottom: '18px' }}>
              <CellBlock
                style={{
                  maxWidth: '158px',
                  marginRight: '116px',
                }}
              />
              <CellBlock
                style={{
                  marginRight: '24px',
                }}
              />
              <CellBlock
                style={{
                  marginRight: '24px',
                }}
              />
              <CellBlock
                style={{
                  marginRight: '24px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '199px',
                  marginRight: '37px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '180px',
                }}
              />
            </Row>

            <Row>
              <CellBlock
                style={{
                  maxWidth: '114px',
                  marginRight: '160px',
                }}
              />
              <CellBlock
                style={{
                  marginRight: '24px',
                }}
              />
              <CellBlock
                style={{
                  marginRight: '24px',
                }}
              />
              <CellBlock
                style={{
                  marginRight: '24px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '199px',
                  marginRight: '37px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '180px',
                }}
              />
            </Row>
          </Container>
            )}
        <Title>No Data Provided</Title>
      </Wrapper>
      <MobileWrapper breakdown={breakdown}>
        {!breakdown
          ? (
          <Container>
            <Row
              style={{
                gap: '0',
                maxWidth: '238px',
              }}
            >
              <CellBlock
                style={{
                  borderRadius: '50%',
                  minWidth: '42px',
                  maxWidth: '42px',
                  height: '42px',
                  marginRight: '5px',
                }}
              />
              <div
                style={{
                  marginRight: '20px',
                  maxWidth: '126px',
                  minWidth: '126px',
                  width: '100%',
                  marginBottom: '36px',
                }}
              >
                <CellBlock
                  style={{
                    height: '22px',
                    marginBottom: '6px',
                    marginRight: '0',
                  }}
                />
                <CellBlock
                  style={{
                    height: '16px',
                    marginRight: '0',
                  }}
                />
              </div>
            </Row>
            {new Array(4).fill('').map((_, i) => (
              <Row
                key={`key-${i}`} 
                style={{
                  justifyContent: 'space-between',
                }}
              >
                <CellBlock
                  style={{
                    maxWidth: '105px',
                    height: '24px',
                    borderRadius: 0,
                  }}
                />
                <CellBlock
                  style={{
                    maxWidth: '105px',
                    height: '24px',
                    borderRadius: 0,
                    marginRight: 0,
                  }}
                />
              </Row>
            ))}
          </Container>
            )
          : (
          <Container>
            <Row>
              <CellBlock
                style={{
                  maxWidth: '152px',
                  height: '24px',
                  marginBottom: '18px',
                  borderRadius: 0,
                }}
              />
            </Row>
            {new Array(3).fill('').map((_, i) => (
              <Row
                key={`key-${i}`}
                style={{
                  justifyContent: 'space-between',
                }}
              >
                <CellBlock
                  style={{
                    maxWidth: '105px',
                    height: '24px',
                    borderRadius: 0,
                  }}
                />
                <CellBlock
                  style={{
                    maxWidth: '105px',
                    height: '24px',
                    borderRadius: 0,
                    marginRight: '0',
                  }}
                />
              </Row>
            ))}
            <Row
              style={{
                marginBottom: '15px',
                justifyContent: 'space-between',
              }}
            >
              <CellBlock
                style={{
                  maxWidth: '105px',
                  height: '24px',
                  marginRight: '23px',
                  borderRadius: 0,
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '167px',
                  height: '24px',
                  borderRadius: 0,
                  marginRight: '0',
                }}
              />
            </Row>
          </Container>
            )}
        <Title>No Data Provided</Title>
      </MobileWrapper>
    </>
  );
};

const MobileWrapper = styled.div<{ breakdown: boolean }>(({ breakdown = false }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  height: breakdown ? '215px' : '265px',
  marginBottom: '64px',
  '@media (min-width: 834px)': {
    display: 'none',
  },
}));

const Wrapper = styled.div({
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  height: '329px',
  width: '100%',
  marginBottom: '64px',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
});

const Title = styled.div({
  fontFamily: 'FT Base',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '38px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: '#9FAFB9',
  zIndex: 1,
  '@media (min-width: 834px)': {
    fontSize: '32px',
  }
});

const Container = styled.div({
  display: 'block',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  padding: '16px 0px 13px 16px',
  '@media (max-width: 833px)': {
    boxSizing: 'border-box',
    padding: '16px 24px',
    background: 'white',
    borderRadius: '6px',
    filter: 'drop-shadow(0px 20px 40px rgba(219, 227, 237, 0.4)) drop-shadow(0px 1px 3px rgba(190, 190, 190, 0.25))',
  },
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background:
      'radial-gradient(white, rgba(255,255,255, 1), rgba(255,255,255,0.9), rgba(255,255,255,0.8), rgba(255,255,255,0.4))',
    backgroundRepeat: 'no-repeat',
  },
});

const Row = styled.div({
  display: 'flex',
  flex: 1,
});

const Line = styled.div({
  height: '1px',
  width: '100%',
  margin: '14px -16px',
  background: '#D4D9E1',
});

const CellBlock = styled.div({
  boxSizing: 'border-box',
  display: 'flex',
  width: '100%',
  flex: 1,
  maxWidth: '126px',
  height: '32px',
  background: 'rgba(45, 193, 177, 0.4)',
  borderRadius: '6px',
  marginRight: '32px',
  '@media (max-width: 833px)': {
    marginBottom: '15px',
  },
});
