import React, { useEffect, useState } from "react";
import { Container, Content, Text, Spinner, Grid, View, Card, Button } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { BackHandler } from 'react-native';

import Itinerary from '../../components/Itinerary';
import { getRoutes } from "../../redux/actions/flights";
import styles from "./style";
import genericStyles from '../../styles';

export default function Results({ navigation }) {
  const dispatch = useDispatch();
  const routesData = useSelector(state => state.flights.routes);
  const error = useSelector(state => state.flights.error);

  const [hasFetched, setHasFetched] = useState(false);

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

  useEffect(
    () => {
      if (!hasFetched) {
        fetchResults();
      }
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);
      setHasFetched(true);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress');
      };
    },
    [routesData]
  );

  const handleBackButtonPressAndroid = () => {
    setHasFetched(false);
    navigation.goBack();
    return false;
  };

  const fetchResults = () => {
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
  }

  const handleRetryPress = () => {
    fetchResults();
  }

  const handleGoBackPress = () => {
    setHasFetched(false);
    navigation.goBack();
  };

  const renderItineraries = () => {
    if (routesData && routesData.Itineraries) {
      return routesData.Itineraries.map((itinerary, index) => <Itinerary key={index} {...itinerary} Carriers={routesData.Carriers} Agents={routesData.Agents} Legs={routesData.Legs} number={index + 1}/>);
    }
  };

  const renderSearchInfo = () => {
    return(
      <Card style={styles.infoContainer}>
        <Text>Desde: {originPlace}</Text>
        <Text>Hacia: {destinationPlace}</Text>
      </Card>
    );
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
  } else if (!routesData && !error) {
    return(
      <Content contentContainerStyle={genericStyles.contentContainerStyle}>
        <Grid style={genericStyles.centeredGridStyle}>
          <Spinner size={50}/>
          <Text>Buscando resultados, espera un momento...</Text>
        </Grid>
      </Content>
    );
  }else if (error) {
    return(
      <Content contentContainerStyle={genericStyles.contentContainerStyle}>
        <Grid style={genericStyles.centeredGridStyle}>
          <Text>Ops! parece que ha ocurrido un problema, intenta de nuevo</Text>
          <Button onPress={handleRetryPress}>
            <Text>Reintentar</Text>
          </Button>
          <Button onPress={handleGoBackPress}>
            <Text>Ir atras</Text>
          </Button>
        </Grid>
      </Content>
    );
  }

  return (
      <Container style={styles.container}>
        <Content padder>
          {renderSearchInfo()}
          {renderItineraries()}
        </Content>
      </Container>
  );
}
