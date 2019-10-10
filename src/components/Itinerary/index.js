import React, { Fragment } from 'react';
import { Card, CardItem, View, Text } from 'native-base';
import { Linking, Image } from 'react-native';
import moment from 'moment';

import styles from './style';

export default function Itinerary({ OutboundLegId, InboundLegId, PricingOptions, Carriers, Legs, Agents, number }) {

  const handleViewMorePress = () => {
    Linking.openURL(PricingOptions[0].DeeplinkUrl).catch((err) => alert('An error occurred', err));
  };

  const renderPricingOptions = () => {
    if (PricingOptions && PricingOptions.length) {
      return PricingOptions.map((pricingOpt, index) => {
        const agent = Agents.filter(agent => agent.Id === pricingOpt.Agents[0])[0];

        return(
          <View key={index} style={styles.pricingOptionContainer}>
            <View>
              <Image source={{ uri: agent.ImageUrl }} style={styles.carrierImage}/>
            </View>
            <View style={styles.pricingOptionRighItem}>
              <Text style={styles.label}>{agent.Name}</Text>
              <Text style={styles.label}>Precio <Text style={styles.subtitle}>${pricingOpt.Price} USD</Text></Text>
            </View>
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
          <Text style={styles.label}>Despegue: <Text style={styles.subtitle}>{moment(outboundLeg.Departure).format('LLL')}</Text></Text>
          <Text style={styles.label}>Aterrizaje: <Text style={styles.subtitle}>{moment(outboundLeg.Arrival).format('LLL')}</Text></Text>
          <Text style={styles.label}>Duracion: <Text style={styles.subtitle}>{((outboundLeg.Duration) / 60).toFixed(2)} horas</Text></Text>
        </CardItem>
        <CardItem bordered style={styles.titlesContainer}>
          <Text style={styles.title}>Vuelo de regreso</Text>
          <Text style={styles.label}>despegue: <Text style={styles.subtitle}>{moment(inboundLeg.Departure).format('LLL')}</Text></Text>
          <Text style={styles.label}>aterrizaje: <Text style={styles.subtitle}>{moment(inboundLeg.Arrival).format('LLL')}</Text></Text>
          <Text style={styles.label}>Duracion: <Text style={styles.subtitle}>{((outboundLeg.Duration) / 60).toFixed(2)} horas</Text></Text>
        </CardItem>
      </Fragment>
    );
  };

  return(
    <Card style={styles.card}>
      <Text style={styles.itineraryNumber}>Itinerario #{number}</Text>
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
