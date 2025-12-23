import type {TextAreaProps} from '@gravity-ui/uikit';

export type DelayedTextAreaProps =
  Required<Pick<TextAreaProps, 'value' | 'onUpdate'>> &
  Omit<TextAreaProps, 'value' | 'onUpdate' | 'defaultValue'> & {
    delay: number;
};