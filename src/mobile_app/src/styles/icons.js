import React from 'react';
import {colors} from './constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const iconSize = {small: 30, normal: 45, large: 60};

export const icon = {
  home: () => {
    return <Icon color={colors.light} name="home" size={iconSize.normal} />;
  },
  contactList: () => {
    return (
      <Icon color={colors.light} name="account-box" size={iconSize.normal} />
    );
  },
  settings: () => {
    return (
      <Icon
        color={colors.light}
        name="settings-applications"
        size={iconSize.normal}
      />
    );
  },
  settingsButton: () => {
    return (
      <Icon
        color={colors.dark}
        name="settings-applications"
        size={iconSize.large}
      />
    );
  },
  logTracker: () => {
    return (
      <Icon color={colors.light} name="find-in-page" size={iconSize.normal} />
    );
  },
  contactAdd: () => {
    return (
      <Icon color={colors.dark} name="library-add" size={iconSize.normal} />
    );
  },
  gateLargeSms: () => {
    return <Icon color={colors.dark} name="sms" size={iconSize.large} />;
  },
  gateLargeWifi: () => {
    return <Icon color={colors.dark} name="wifi" size={iconSize.large} />;
  },
  delete: () => {
    return (
      <Icon color={colors.dark} name="delete-forever" size={iconSize.small} />
    );
  },
  save: () => {
    return <Icon color={colors.dark} name="save" size={iconSize.normal} />;
  },
  renew: () => {
    return <Icon color={colors.dark} name="autorenew" size={iconSize.normal} />;
  },
  filter: () => {
    return (
      <Icon color={colors.dark} name="filter-list" size={iconSize.normal} />
    );
  },
  exit: () => {
    return (
      <Icon color={colors.dark} name="exit-to-app" size={iconSize.normal} />
    );
  },
};

/*
contactList: () => {
  return <Icon color={colors.bright} name="account-box" size={30} />;
},
*/
