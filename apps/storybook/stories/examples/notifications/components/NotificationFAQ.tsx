import { Card, Disclosure, DisclosureGroup, Text } from "@jigsaw/design-system";

export const NotificationFAQ = () => (
    <Card classNameOverrides={{ content: "p-6" }}>
        <Text size="base" weight="semibold" classNameOverrides={{ component: "mb-4" }}>
          Frequently asked questions
        </Text>
        <DisclosureGroup>
          <Disclosure title="How do I mute a specific channel?">
            Open the channel settings, click the bell icon, and select <strong>Mute</strong>. You can set a duration or mute indefinitely.
          </Disclosure>
          <Disclosure title="Why am I getting duplicate notifications?">
            This can happen if you're logged into multiple devices. Check your notification settings on each device and ensure push notifications are only enabled on your primary device.
          </Disclosure>
          <Disclosure title="Can I schedule a do-not-disturb window?">
            Yes — go to <strong>Settings → Notifications → Quiet hours</strong> and set your preferred start and end times. Notifications are queued and delivered when the window ends.
          </Disclosure>
          <Disclosure title="How do I export a notification history?">
            Notification history can be exported from <strong>Settings → Data → Export</strong>. You'll receive a CSV or JSON file via email within a few minutes.
          </Disclosure>
        </DisclosureGroup>
    </Card>
);
