import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import {
  View,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon,
  DatePicker
} from "native-base";

import { RESULTS } from '../../consts';
import FixedList from "../FixedList";
import { getLocations } from "../../redux/actions/flights";
import styles from "./style";

export default function SearchComponent({ navigation }) {
  const [outBoundDate, setOutboundDate] = useState(null);
  const [inBoundDate, setInboundDate] = useState(null);

  const [showOriginPlaceList, setShowOriginPlaceList] = useState(false);
  const [originPlace, setOriginPlace] = useState({ PlaceName: "" });

  const [showDestinationPlaceList, setShowDestinationPlaceList] = useState(false);
  const [destinationPlace, setDestinationPlace] = useState({ PlaceName: "" });

  const places = useSelector(state => state.flights.places);
  const dispatch = useDispatch();

  const handleOriginTextChange = text => {
    setOriginPlace({ PlaceName: text });
  };

  const handleOriginPlaceSelected = place => {
    setOriginPlace(place);
    setShowOriginPlaceList(false);
  };

  const handleOriginKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key !== 'Backspace' && originPlace.PlaceName.length > 2) {
      dispatch(getLocations({ query: originPlace.PlaceName }));
      setShowOriginPlaceList(true);
    }
  };

  const handleDestinationKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key !== 'Backspace' && destinationPlace.PlaceName.length > 2 ) {
      dispatch(getLocations({ query: destinationPlace.PlaceName }));
      setShowDestinationPlaceList(true);
    }
  };

  const handleDestinationTextChange = text => {
    setDestinationPlace({ PlaceName: text });
  };

  const handleDestinationPlaceSelected = place => {
    setDestinationPlace(place);
    setShowDestinationPlaceList(false);
  };

  const handleSearchPress = () => {
    const outboundpartialdate = moment(outBoundDate).format('YYYY-MM-DD');
    const inboundpartialdate = moment(inBoundDate).format('YYYY-MM-DD');

    navigation.navigate(RESULTS, {
      outboundpartialdate,
      inboundpartialdate,
      originplace: originPlace.PlaceId,
      destinationplace: destinationPlace.PlaceId
    });
  };

  const isSearchButtonDisabled = () => {
    if (!outBoundDate || !inBoundDate || !originPlace || !destinationPlace) {
      return true;
    }
  }

  return (
    <Form style={styles.form}>
      <Item>
        <Input
          style={styles.input}
          placeholder="Origen"
          onChangeText={handleOriginTextChange}
          value={originPlace.PlaceName}
          onKeyPress={handleOriginKeyPress}
        />
        <Icon name="ios-home" />
      </Item>
      {showOriginPlaceList && (
        <FixedList
          places={places}
          containerStyle={{ top: 55 }}
          onItemPress={placeSelected =>
            handleOriginPlaceSelected(placeSelected)
          }
        />
      )}
      <Item>
        <Input
          style={styles.input}
          placeholder="Destino"
          onChangeText={handleDestinationTextChange}
          value={destinationPlace.PlaceName}
          onKeyPress={handleDestinationKeyPress}/>
        <Icon name="ios-airplane" />
      </Item>
      {showDestinationPlaceList && (
        <FixedList
          places={places}
          onItemPress={placeSelected =>
            handleDestinationPlaceSelected(placeSelected)
          }
          containerStyle={{ top: 120 }}
        />
      )}
      <Item style={styles.datesContainer}>
        <DatePicker
          style={styles.input}
          placeHolderText="Ida"
          onDateChange={newDate => setOutboundDate(newDate)}
        />
        <Icon name="calendar" />

        <DatePicker
          style={styles.input}
          placeHolderText="Regreso"
          onDateChange={newDate => setInboundDate(newDate)}
        />
        <Icon name="calendar" />
      </Item>
      { (!showOriginPlaceList && !showDestinationPlaceList) && (
        <Button full style={styles.searchButton} onPress={handleSearchPress} disabled={isSearchButtonDisabled()}>
          <Text>Buscar</Text>
          <Icon name="search" />
        </Button>
      )}
    </Form>
  );
}
