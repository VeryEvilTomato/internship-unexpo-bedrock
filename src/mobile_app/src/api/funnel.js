import * as HTTPhandlers from './http';
import * as SMShandlers from './sms';
import * as CALLhandlers from './call';

export const funnel = type => {
  const handlers = {
    HTTP: HTTPhandlers,
    SMS: SMShandlers,
    CALL: CALLhandlers,
    default: HTTPhandlers,
  };
  return handlers[type] || handlers.default;
};
