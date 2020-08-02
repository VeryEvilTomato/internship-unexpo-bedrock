import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Input, Text, Button, Divider} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '@styles';
import {PROPS_NEW_USER} from '@constants';

export const FilterMenu = ({setFilters, filters, toggleOverlay}) => {
  const currentSystemDate = new Date();
  const [show, setShowDatePicker] = useState(false);
  const [form, setForm] = useState({
    id: null,
    error: null,
    number: null,
    method: null,
    is_staff: null,
    first_name: null,
    last_name: null,
    phone: null,
    opening_date: filters.opening_date,
    opening_time: null,
  });

  return (
    <ScrollView>
      <View>
        <Text style={styles.font.darkNormal}>Número:</Text>
        <Input
          value={form.first_name}
          onChangeText={text => {
            setForm({...form, first_name: text});
          }}
          {...PROPS_NEW_USER.PHONE_NUMBER}
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
            setFilters(form);
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
