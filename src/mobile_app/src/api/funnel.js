import * as HTTPhandlers from './http';
import * as SMShandlers from './sms';

export const funnel = type => {
  const handlers = {
    HTTP: HTTPhandlers,
    SMS: SMShandlers,
    default: HTTPhandlers,
  };
  return handlers[type] || handlers.default;
};
