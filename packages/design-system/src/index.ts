export const designSystemVersion = "0.0.1";

// Shared prop types
export type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

// Button
export { Button } from "@components/button/Button";
export type { ButtonProps } from "@components/button/Button";

// Text
export { Text } from "@components/text/Text";
export type { TextProps } from "@components/text/Text";

// Avatar
export { Avatar } from "@components/avatar";
export type { AvatarProps, AvatarSize, AvatarStatus } from "@components/avatar";

// Badge
export { Badge } from "@components/badge/Badge";
export type { BadgeProps } from "@components/badge/Badge";
export type { BadgeVariant, BadgeSize } from "@components/badge/Badge.styles";

// Card
export { Card } from "@components/card";
export type { CardComponent, CardProps, CardVariant } from "@components/card";

// Checkbox
export { Checkbox } from "@components/checkbox/Checkbox";
export type { CheckboxProps } from "@components/checkbox/Checkbox";

// CheckboxGroup
export { CheckboxGroup } from "@components/checkbox-group/CheckboxGroup";
export type { CheckboxGroupProps } from "@components/checkbox-group/CheckboxGroup";

// Disclosure
export { Disclosure, DisclosureGroup } from "@components/disclosure/Disclosure";
export type { DisclosureProps, DisclosureGroupProps } from "@components/disclosure/Disclosure";

// Form
export { Form, FormFieldset, FormActions } from "@components/form/Form";
export type { FormProps, FormFieldsetProps, FormActionsProps } from "@components/form/Form";

// Icon
export { Icon } from "@components/icon";
export type { IconProps, CustomIconStyle, IconTone, IconSize } from "@components/icon";

// Input
export { Input } from "@components/input/Input";
export type { InputProps } from "@components/input/Input";

// Link
export { Link, LinkButton, ButtonLink } from "@components/link/Link";
export type { LinkProps, LinkButtonProps } from "@components/link/Link";

// Modal
export { Modal } from "@components/modal";
export type { ModalProps, ModalTriggerElement } from "@components/modal";

// Navigation
export { Navigation, NavigationInner, NavigationBrand, NavigationLinks, NavigationLink, NavigationActions, MobileNavigation } from "@components/navigation/Navigation";
export type { NavigationProps, NavigationInnerProps, NavigationBrandProps, NavigationLinksProps, NavigationLinkProps, NavigationActionsProps, MobileNavigationProps } from "@components/navigation/Navigation";

// NumberField
export { NumberField } from "@components/number-field/NumberField";
export type { NumberFieldProps } from "@components/number-field/NumberField";

// RadioGroup
export { RadioGroup, Radio } from "@components/radio-group/RadioGroup";
export type { RadioGroupProps, RadioProps } from "@components/radio-group/RadioGroup";

// SearchField
export { SearchField } from "@components/search-field/SearchField";
export type { SearchFieldProps } from "@components/search-field/SearchField";

// Select
export { Select, SelectItem } from "@components/select/Select";
export type { SelectProps, SelectItemProps } from "@components/select/Select";

// Skeleton
export { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard } from "@components/skeleton/Skeleton";
export type { SkeletonProps } from "@components/skeleton/Skeleton";
export type { SkeletonVariant } from "@components/skeleton/Skeleton.styles";

// Tabs
export { Tabs, TabList, Tab, TabPanel } from "@components/tabs";
export type { TabsProps, TabListProps, TabProps, TabPanelProps } from "@components/tabs";
export type { TabsVariant } from "@components/tabs";

// Textarea
export { Textarea } from "@components/textarea/Textarea";
export type { TextareaProps } from "@components/textarea/Textarea";

// Toast
export { ToastProvider, ToastItem, useToast } from "@components/toast/Toast";
export type { ToastData, ToastProviderProps, ToastItemProps } from "@components/toast/Toast";
export type { ToastVariant, ToastPosition } from "@components/toast/Toast.styles";

// Tooltip
export { Tooltip, TooltipTrigger } from "@components/tooltip/Tooltip";
export type { TooltipProps, TooltipTriggerProps } from "@components/tooltip/Tooltip";
export type { TooltipPlacement } from "@components/tooltip/Tooltip.styles";
