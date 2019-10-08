import React, { useEffect } from "react";
import { Container, Content, Text, Spinner } from "native-base";
import { useDispatch, useSelector } from "react-redux";

import QuoteItem from '../../components/QuoteItem';
import { getRoutes } from "../../redux/actions/flights";
import styles from "./style";

export default function Results({ navigation }) {
  const dispatch = useDispatch();
  const routesData = useSelector(state => state.flights.routes);

  useEffect(
    () => {
      if (!routesData) {
        /*const {
          state: {
            params: {
              destinationplace,
              inboundpartialdate,
              originplace,
              outboundpartialdate
            }
          }
        } = navigation; */

        dispatch(
          getRoutes({
            destinationplace: 'LAX-sky',
            inboundpartialdate: '2019-12-01',
            originplace: 'SFO-sky',
            outboundpartialdate: '2019-11-01'
          })
        );
      }
    },
    [routesData]
  );

  const renderQuotes = () => {
    if (routesData && routesData.Quotes.length) {
      const carriers = routesData.Carriers;

      return routesData.Quotes.map((quote, index) => {
        const carrierIds = quote.OutboundLeg.CarrierIds;

        if (carrierIds.length) {
          return carrierIds.map(carrierId => {
            const currentCarrier =
              carriers.filter(value => value.CarrierId === carrierId)[0] || {};
            return <QuoteItem key={index} {...quote} currentCarrier={currentCarrier}/>
          });
        }
      });
    }
  };

  if (routesData && !routesData.Quotes.length) {
    return (
      <Container>
        <Content>
          <Text>No results</Text>
        </Content>
      </Container>
    );
  } else if (!routesData) {
    return <Spinner size={40} />;
  }

  console.log(routesData);

  return (
    <Container style={styles.container}>
      <Content>{renderQuotes()}</Content>
    </Container>
  );
}
