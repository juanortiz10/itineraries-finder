import React, { useEffect, useState } from "react";
import { Container, Content, Text, Spinner, Grid } from "native-base";
import { useDispatch, useSelector } from "react-redux";

import Itinerary from '../../components/Itinerary';
import { getRoutes } from "../../redux/actions/flights";
import styles from "./style";
import genericStyles from '../../styles';

export default function Results({ navigation }) {
  const dispatch = useDispatch();
  const routesData = useSelector(state => state.flights.routes);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(
    () => {
      if (!hasFetched) {
        const {
          state: {
            params: {
              destinationPlace,
              inboundDate,
              originPlace,
              outboundDate,
              adults,
              children,
              cabinClass
            }
          }
        } = navigation;

        dispatch(
          getRoutes({
            destinationPlace,
            inboundDate,
            originPlace,
            outboundDate,
            adults,
            children,
            cabinClass
          })
        );

        setHasFetched(true);
      }
    },
    [hasFetched]
  );

  const renderItineraries = () => {
    if (routesData && routesData.Itineraries) {
      return routesData.Itineraries.map((itinerary, index) => <Itinerary key={index} {...itinerary} Carriers={routesData.Carriers} Agents={routesData.Agents} Legs={routesData.Legs}/>);
    }
  };

  if (routesData && !routesData.Itineraries) {
    return (
      <Container>
        <Content contentContainerStyle={genericStyles.contentContainerStyle}>
          <Grid style={genericStyles.centeredGridStyle}>
            <Text>No results</Text>
          </Grid>
        </Content>
      </Container>
    );
  } else if (!routesData) {
    return(
      <Content contentContainerStyle={genericStyles.contentContainerStyle}>
        <Grid style={genericStyles.centeredGridStyle}>
          <Spinner size={50}/>
          <Text>Buscando resultados, espera un momento...</Text>
        </Grid>
      </Content>
    );
  }



  return (
    <Container style={styles.container}>
      <Content>{renderItineraries()}</Content>
    </Container>
  );
}
