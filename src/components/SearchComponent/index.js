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
  DatePicker,
  Picker
} from "native-base";

import { RESULTS } from '../../consts';
import FixedList from "../FixedList";
import { getLocations } from "../../redux/actions/flights";
import styles from "./style";

export default function SearchComponent({ navigation }) {
  const [outboundDate, setoutboundDate] = useState(null);
  const [inboundDate, setinboundDate] = useState(null);

  const [showOriginPlaceList, setShowOriginPlaceList] = useState(false);
  const [originPlace, setOriginPlace] = useState({ PlaceName: "" });

  const [showDestinationPlaceList, setShowDestinationPlaceList] = useState(false);
  const [destinationPlace, setDestinationPlace] = useState({ PlaceName: "" });

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [cabinClass, setCabinClass] = useState(0);

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

  const handleCabinClassChange = cabinClass => {
    setCabinClass(cabinClass);
  };

  const handleSearchPress = () => {
    navigation.navigate(RESULTS, {
      outboundDate: moment(outboundDate).format('YYYY-MM-DD'),
      inboundDate: moment(inboundDate).format('YYYY-MM-DD'),
      originPlace: originPlace.PlaceId,
      destinationPlace: destinationPlace.PlaceId,
      adults,
      children,
      cabinClass
    });
  };

  const isSearchButtonDisabled = () => {
    if (!outboundDate || !inboundDate || !originPlace || !destinationPlace || !adults) {
      return true;
    }
  }

  const handleAdultsChange = value => {
    setAdults(value);
  };

  const handleChildrenChange = value => {
    setChildren(value);
  };

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
          onDateChange={newDate => setoutboundDate(newDate)}
        />
        <Icon name="calendar" />

        <DatePicker
          style={styles.input}
          placeHolderText="Regreso"
          onDateChange={newDate => setinboundDate(newDate)}
        />
        <Icon name="calendar" />
      </Item>
      <Item style={styles.pickersContainer}>
        <Icon name="person"/>
        <Picker
          selectedValue={adults}
          onValueChange={handleAdultsChange}>
          <Picker.Item label="Adultos" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
        <Icon name="person"/>
        <Picker
          selectedValue={children}
          onValueChange={handleChildrenChange}>
          <Picker.Item label="Niños" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
      </Item>
      <Item>
        <Icon name="happy"/>
        <Picker
          selectedValue={cabinClass}
          onValueChange={handleCabinClassChange}>
          <Picker.Item label="Clase" value="0" />
          <Picker.Item label="Economica" value="economy" />
          <Picker.Item label="Premium" value="premiumeconomy" />
          <Picker.Item label="Negocios" value="business" />
          <Picker.Item label="Primera clase" value="first" />
        </Picker>
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
