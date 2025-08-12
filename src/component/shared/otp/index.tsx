import React, { useRef, useState, useEffect } from "react";

type OTPInputProps = {
  length?: number; // default 6
  autoFocus?: boolean;
  onComplete?: (code: string) => void;
  className?: string;
};

const isDigit = (ch: string) => /^\d$/.test(ch);

export default function OTPInput({
  length = 6,
  autoFocus = true,
  onComplete,
  className,
}: OTPInputProps) {
  const [values, setValues] = useState<string[]>(() => Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  // ensure ref array length
  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    if (autoFocus) {
      // focus first empty input
      const firstEmpty = values.findIndex((v) => v === "");
      const idx = firstEmpty === -1 ? length - 1 : firstEmpty;
      inputsRef.current[idx]?.focus();
      inputsRef.current[idx]?.select();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus]);

  useEffect(() => {
    const complete = values.every((v) => v !== "");
    if (complete) {
      onComplete?.(values.join(""));
    }
  }, [values, onComplete]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const raw = e.target.value;
    // keep only last digit typed (in case of fast typing)
    const char = raw.slice(-1);
    if (!isDigit(char)) {
      // if user typed non-digit, ignore and clear input
      return;
    }
    const nextValues = [...values];
    nextValues[idx] = char;
    setValues(nextValues);

    // move focus to next input
    const nextIdx = idx + 1;
    if (nextIdx < length) {
      inputsRef.current[nextIdx]?.focus();
      inputsRef.current[nextIdx]?.select();
    } else {
      // blur last input to signal completion
      inputsRef.current[idx]?.blur();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    const key = e.key;

    if (key === "Backspace") {
      e.preventDefault();
      const nextValues = [...values];
      if (values[idx]) {
        // delete current digit
        nextValues[idx] = "";
        setValues(nextValues);
        inputsRef.current[idx]?.focus();
      } else {
        // move to previous and clear it
        const prevIdx = idx - 1;
        if (prevIdx >= 0) {
          nextValues[prevIdx] = "";
          setValues(nextValues);
          inputsRef.current[prevIdx]?.focus();
          inputsRef.current[prevIdx]?.select();
        }
      }
    } else if (key === "ArrowLeft") {
      e.preventDefault();
      const prev = Math.max(0, idx - 1);
      inputsRef.current[prev]?.focus();
      inputsRef.current[prev]?.select();
    } else if (key === "ArrowRight") {
      e.preventDefault();
      const next = Math.min(length - 1, idx + 1);
      inputsRef.current[next]?.focus();
      inputsRef.current[next]?.select();
    } else if (key === "Enter") {
      // optionally handle enter
      e.currentTarget.blur();
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").trim();
    const digits = text
      .split("")
      .filter((ch) => isDigit(ch))
      .slice(0, length);
    if (digits.length === 0) return;

    const nextValues = Array(length).fill("");
    for (let i = 0; i < digits.length; i++) {
      nextValues[i] = digits[i];
      if (i < length && inputsRef.current[i]) {
        inputsRef.current[i]!.value = digits[i]; // sync DOM
      }
    }
    setValues(nextValues);

    // focus the box after the last pasted digit
    const focusIdx = Math.min(digits.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
    inputsRef.current[focusIdx]?.select();
  };

  return (
    <div className={className} role="group" aria-label="One-time code">
      <div style={{ display: "flex", gap: 8 }}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            value={values[i]}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            aria-label={`Digit ${i + 1}`}
            style={{
              width: 44,
              height: 44,
              textAlign: "center",
              fontSize: 18,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
        ))}
      </div>
    </div>
  );
}
