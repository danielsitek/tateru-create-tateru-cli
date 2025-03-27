
const analyticsEvent = (event, eventContent = undefined) => {
  if (!gtag) {
    return;
  }

  gtag('event', event, eventContent);
}

export class AnalyticsServices {
  static customEvent() {
    analyticsEvent('custom_event_name', {
      'event_category': 'custom_event_category',
      'event_label': `Custom Event Label`,
      'value': 1,
    });
  }
}
