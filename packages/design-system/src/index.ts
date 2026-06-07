export const designSystemVersion = "0.0.1";

// Shared prop types
export type { ClassNameOverrides, RootClassName, WithoutClassName } from "@jsw-types/component-props";

// Button
export { Button } from "@components/button";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonMediaPosition,
} from "@components/button";

// Text
export { Text } from "@components/text/Text";
export type { TextProps } from "@components/text/Text";

// Heading
export { Heading, H1, H2, H3, H4, H5, H6 } from "@components/heading";
export type {
  HeadingProps,
  HeadingAliasProps,
  HeadingLevel,
  HeadingSize,
} from "@components/heading";

// Avatar
export { Avatar } from "@components/avatar";
export type { AvatarProps, AvatarSize, AvatarStatus } from "@components/avatar";

// Badge
export { Badge } from "@components/badge/Badge";
export type { BadgeProps } from "@components/badge/Badge";
export type { BadgeVariant, BadgeSize } from "@components/badge/Badge.types";

// Card
export { Card } from "@components/card";
export type { CardComponent, CardProps, CardVariant } from "@components/card";

// Checkbox
export { Checkbox } from "@components/checkbox";
export type { CheckboxProps, CheckboxSize } from "@components/checkbox";

// CheckboxGroup
export { CheckboxGroup } from "@components/checkbox-group";
export type { CheckboxGroupProps } from "@components/checkbox-group";

// Disclosure
export { Disclosure, DisclosureGroup } from "@components/disclosure";
export type { DisclosureProps, DisclosureGroupProps } from "@components/disclosure";

// Form
export { Form } from "@components/form";
export type {
  FormComponent,
  FormProps,
  FormGroupProps,
  FormGroupClassNameOverrides,
  LabelPosition,
} from "@components/form";

// Icon
export { Icon } from "@components/icon";
export type { IconProps, CustomIconStyle, IconTone, IconSize } from "@components/icon";

// Input
export { Input } from "@components/input";
export type { InputProps, InputSize } from "@components/input";

// Link
export { Link, LinkButton, ButtonLink } from "@components/link";
export type {
  LinkProps,
  LinkButtonProps,
  LinkVariant,
  LinkSize,
  LinkButtonVariant,
  LinkButtonSize,
} from "@components/link";

// Modal
export { Modal } from "@components/modal";
export type { ModalProps, ModalTriggerElement } from "@components/modal";

// Navigation
export { Navigation, NavigationInner, NavigationBrand, NavigationLinks, NavigationLink, NavigationActions, MobileNavigation } from "@components/navigation/Navigation";
export type { NavigationProps, NavigationInnerProps, NavigationBrandProps, NavigationLinksProps, NavigationLinkProps, NavigationActionsProps, MobileNavigationProps } from "@components/navigation/Navigation";

// NumberField
export { NumberField } from "@components/number-field";
export type { NumberFieldProps, NumberFieldSize } from "@components/number-field";

// RadioGroup
export { RadioGroup, Radio } from "@components/radio-group/RadioGroup";
export type { RadioGroupProps, RadioProps } from "@components/radio-group/RadioGroup";

// SearchField
export { SearchField } from "@components/search-field";
export type { SearchFieldProps, SearchFieldSize } from "@components/search-field";

// Select
export { Select } from "@components/select";
export type { SelectComponent, SelectProps, SelectItemProps, SelectSize } from "@components/select";

// Skeleton
export { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard } from "@components/skeleton/Skeleton";
export type { SkeletonProps } from "@components/skeleton/Skeleton";
export type { SkeletonVariant } from "@components/skeleton/Skeleton.types";

// Tabs
export { Tabs, TabList, Tab, TabPanel } from "@components/tabs";
export type { TabsProps, TabListProps, TabProps, TabPanelProps } from "@components/tabs";
export type { TabsVariant } from "@components/tabs";

// Textarea
export { Textarea } from "@components/textarea";
export type { TextareaProps, TextareaSize } from "@components/textarea";

// Toast
export { toast, ToastRegion, DEFAULT_TOAST_REGION } from "@components/toast";
export type {
  ToastOptions,
  ToastCallOptions,
  ToastContent,
  ToastRegionId,
  ToastRegionProps,
  ToastVariant,
  ToastPosition,
} from "@components/toast";
export { toastVariants, toastPositions } from "@components/toast";

// Tooltip
export { Tooltip, TooltipTrigger } from "@components/tooltip";
export type { TooltipProps, TooltipTriggerProps, TooltipPlacement } from "@components/tooltip";
