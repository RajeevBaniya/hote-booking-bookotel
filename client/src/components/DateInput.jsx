import React, { useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function supportsNativeDateInput() {
  if (typeof document === "undefined") return false;
  const input = document.createElement("input");
  input.setAttribute("type", "date");
  // Some browsers report type="text" when not supported
  const isTypeDate = input.type === "date";
  // showPicker exists on modern Chromium; not on iOS Safari
  const hasPickerMethod = typeof input.showPicker === "function";
  return isTypeDate && hasPickerMethod;
}

const DateInput = ({ value, onChange, min, placeholder, className = "w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none", id }) => {
  const hasNative = useMemo(supportsNativeDateInput, []);

  if (hasNative) {
    return (
      <input
        id={id}
        type="date"
        value={value ?? ""}
        onChange={(e) => onChange && onChange(e.target.value)}
        min={min}
        placeholder={placeholder}
        className={className}
      />
    );
  }

  return (
    <DatePicker
      selected={value ? new Date(value) : null}
      onChange={(d) => onChange && onChange(d ? d.toISOString().split("T")[0] : "")}
      minDate={min ? new Date(min) : undefined}
      placeholderText={placeholder || "mm/dd/yyyy"}
      className={className}
      dateFormat="MM/dd/yyyy"
      id={id}
    />
  );
};

export default DateInput;


