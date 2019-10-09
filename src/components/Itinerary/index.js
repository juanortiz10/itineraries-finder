import React, { Fragment } from 'react';
import { Card, CardItem, View, Text } from 'native-base';
import { Linking, Image } from 'react-native';
import moment from 'moment';

import styles from './style';

export default function Itinerary({ OutboundLegId, InboundLegId, PricingOptions, Carriers, Legs, Agents }) {

  const handleViewMorePress = () => {
    Linking.openURL(PricingOptions[0].DeeplinkUrl).catch((err) => alert('An error occurred', err));
  };

  const renderPricingOptions = () => {
    if (PricingOptions && PricingOptions.length) {
      return PricingOptions.map((pricingOpt, index) => {
        const agent = Agents.filter(agent => agent.Id === pricingOpt.Agents[0])[0];

        return(
          <View key={index}>
            <View>
              <Image source={{ uri: agent.ImageUrl }} style={{ width: 100, height: 50 }}/>
              <Text style={styles.label}>{agent.Name}</Text>
            </View>
            <Text style={styles.label}>Precio <Text style={styles.subtitle}>${pricingOpt.Price} USD</Text></Text>
          </View>
        );
      })
    }
  };

  const renderLegs = () => {
    const outboundLeg = Legs.filter(leg => leg.Id === OutboundLegId)[0] || {};
    const inboundLeg = Legs.filter(leg => leg.Id === InboundLegId)[0] || {};

    return(
      <Fragment>
        <CardItem bordered style={styles.titlesContainer}>
          <Text style={styles.title}>Vuelo de ida</Text>
          <Text style={styles.label}>Hora de despegue: <Text style={styles.subtitle}>{moment(outboundLeg.Departure).format('LLL')}</Text></Text>
          <Text style={styles.label}>Hora de aterrizaje: <Text style={styles.subtitle}>{moment(outboundLeg.Arrival).format('LLL')}</Text></Text>
          <Text style={styles.label}>Duracion de vuelo: <Text style={styles.subtitle}>{((outboundLeg.Duration) / 60).toFixed(2)} horas</Text></Text>
        </CardItem>
        <CardItem bordered style={styles.titlesContainer}>
          <Text style={styles.title}>Vuelo de regreso</Text>
          <Text style={styles.label}>Hora de despegue: <Text style={styles.subtitle}>{moment(inboundLeg.Departure).format('LLL')}</Text></Text>
          <Text style={styles.label}>Hora de aterrizaje: <Text style={styles.subtitle}>{moment(inboundLeg.Arrival).format('LLL')}</Text></Text>
          <Text style={styles.label}>Duracion de vuelo: <Text style={styles.subtitle}>{((outboundLeg.Duration) / 60).toFixed(2)} horas</Text></Text>
        </CardItem>
      </Fragment>
    );
  };

  return(
    <Card style={styles.card}>
      {renderLegs()}
      <CardItem bordered style={styles.titlesContainer}>
        {renderPricingOptions()}
      </CardItem>
      <CardItem footer bordered button onPress={handleViewMorePress}>
        <Text>Ver mas</Text>
      </CardItem>
    </Card>
  );
}
