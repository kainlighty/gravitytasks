// GPT

/**
 * Перебивка: https://preview.gravity-ui.com/components/?path=/story/components-delayedtextinput--default
 */

import { type ChangeEvent, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { TextArea } from '@gravity-ui/uikit';
import type { DelayedTextAreaProps } from './types';

export const DelayedTextArea = forwardRef<HTMLTextAreaElement, DelayedTextAreaProps>(
  (props, ref) => {
      const {
          value,
          onUpdate,
          delay,
          onChange,
          ...textAreaProps
      } = props;

      const { hasClear } = textAreaProps

      const { currentValue, delayedOnChange, cancel } = useDelayedValue(value, onUpdate, delay);

      const handleUpdate = useCallback((nextValue: string) => {
            // Частый UX: hasClear хочется применять мгновенно, а не через debounce.
            if (hasClear && nextValue === '') {
                cancel();
                onUpdate('');
                return;
            }
            delayedOnChange(nextValue);
        },
        [cancel, delayedOnChange, hasClear, onUpdate],
      );

      const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
            onChange?.(e);
        },
        [onChange],
      );

      return (
        <TextArea
          {...textAreaProps}
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          onUpdate={handleUpdate}
        />
      );
  },
);

export function useDelayedValue<T = unknown>(
  value: T,
  onChange: (next: T) => void,
  delay = 200,
) {
    const [currentValue, setCurrentValue] = useState<T>(value);

    const timeoutRef = useRef<number | undefined>(undefined);
    const lastValueRef = useRef<T>(value);

    // debounce активен?
    const pendingRef = useRef(false);

    // внешний value, который пришёл пока мы pending (чтобы не перетереть ввод)
    const queuedExternalRef = useRef<T | undefined>(undefined);

    const applyExternal = useCallback((next: T) => {
        queuedExternalRef.current = undefined;
        lastValueRef.current = next;
        setCurrentValue(next);
    }, []);

    const cancel = useCallback(() => {
        if (timeoutRef.current !== undefined) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
        pendingRef.current = false;

        // если во время ввода приходил внешний value — применим его после отмены
        if (queuedExternalRef.current !== undefined) {
            applyExternal(queuedExternalRef.current);
        }
    }, [applyExternal]);

    const flush = useCallback(() => {
        // принудительно отправим то, что юзер напечатал последним
        if (timeoutRef.current !== undefined) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
        pendingRef.current = false;
        onChange(lastValueRef.current);

        // затем (если был внешний апдейт) применим внешний
        if (queuedExternalRef.current !== undefined) {
            applyExternal(queuedExternalRef.current);
        }
    }, [applyExternal, onChange]);

    const delayedOnChange = useCallback(
      (nextValue: T) => {
          lastValueRef.current = nextValue;
          setCurrentValue(nextValue);

          // стартуем/продлеваем pending
          pendingRef.current = true;

          if (timeoutRef.current !== undefined) {
              window.clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = window.setTimeout(() => {
              timeoutRef.current = undefined;
              pendingRef.current = false;

              onChange(nextValue);

              // если пока ждали — прилетел внешний value, применяем его после отправки
              if (queuedExternalRef.current !== undefined) {
                  applyExternal(queuedExternalRef.current);
              }
          }, delay);
      },
      [applyExternal, delay, onChange],
    );

    // Синхронизация value снаружи:
    // - если НЕ pending: сразу отображаем
    // - если pending: НЕ перетираем ввод, а запоминаем внешний value
    useEffect(() => {
        if (pendingRef.current) {
            // если внешний value равен текущему инпуту — ничего не надо
            if (!Object.is(value, lastValueRef.current)) {
                queuedExternalRef.current = value;
            }
            return;
        }

        // не pending — спокойно синкаемся
        if (!Object.is(value, currentValue)) {
            applyExternal(value);
        } else {
            lastValueRef.current = value;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => cancel, [cancel]);

    return { currentValue, delayedOnChange, cancel, flush };
}
