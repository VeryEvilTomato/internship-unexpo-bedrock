import React, {useState} from 'react';
import {Alert, View, ScrollView} from 'react-native';
import {Input, Text, Button, Divider} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '@styles';
import {PROPS_CREDENTIALS} from '@constants';

export const FilterMenu = ({setFilters, filters, toggleOverlay}) => {
  const currentSystemDate = new Date();
  const [show, setShowDatePicker] = useState(false);
  const [form, setForm] = useState({
    number: null,
    opening_date: filters.opening_date,
  });

  return (
    <ScrollView>
      <View>
        <Text style={styles.font.darkNormal}>Número:</Text>
        <Input
          value={form.number}
          onChangeText={text => {
            if (text.length > 5) {
              text = text.slice(0, 4) + text.slice(5);
            } else if (text.length === 5 && text[4] === '-') {
              text = text.slice(0, 4);
            }
            if (text.match('^[0-9]{0,11}$')) {
              if (text.length > 4) {
                text = text.slice(0, 4) + '-' + text.slice(4);
              }
              setForm({...form, number: text});
            }
          }}
          maxLength={12}
          keyboardType="phone-pad"
          {...PROPS_CREDENTIALS.PHONE_NUMBER}
        />

        <Text style={styles.font.darkNormal}>Fecha:</Text>
        <Button
          onPress={() => {
            setShowDatePicker(true);
          }}
          disabled={show}
          buttonStyle={styles.button.delete}
          titleStyle={styles.font.dark}
          title={form.opening_date.toLocaleDateString()}
        />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={form.opening_date}
            display="calendar"
            maximumDate={currentSystemDate}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || form.opening_date;
              // DatePicker must be hid before the state change
              // else it'll be caught in a re-render and
              // the date picker will shown twice.
              setShowDatePicker(false);
              switch (event.type) {
                case 'set':
                  setForm({...form, opening_date: currentDate});
                  break;
                case 'dismissed':
                  break;
              }
            }}
          />
        )}

        <Divider style={styles.divider.normal} />
        <Button
          onPress={() => {
            const {number} = form;
            if (number !== null) {
              const slicedNumber = number.slice(1, 4) + number.slice(5);
              if (number.length !== 12) {
                Alert.alert('', 'Escriba su número telefónico completo', [
                  {text: 'Continuar', onPress: () => {}},
                ]);
              } else {
                setFilters({...form, number: slicedNumber});
              }
            } else {
              setFilters(form);
            }
            toggleOverlay();
          }}
          disabled={show}
          buttonStyle={styles.button.normal}
          titleStyle={styles.font.dark}
          title="Aplicar filtros"
        />
      </View>
    </ScrollView>
  );
};
