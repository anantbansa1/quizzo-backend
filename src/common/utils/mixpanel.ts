import mixpanel from "mixpanel";
import { conf } from "~src/config/settings";

export const mixpanelIdentify = (email_id: string) => {
  const Mixpanel = mixpanel.init(conf.MIXPANEL_TOKEN);
  Mixpanel.people.set(email_id, {
    email: email_id,
  });
};

export const mixpanelTrackAction = (email_id: string, action: string) => {
  const mixpanelClient = mixpanel.init(conf.MIXPANEL_TOKEN);
  mixpanelIdentify(email_id);
  mixpanelClient.track(action, {
    distinct_id: email_id,
    Email: email_id,
  });
};
