import React from "react"
import { TextField, FormControl } from "@mui/material"

interface FormNumberInputProps {
  value: number
  label: string
  onChange: React.Dispatch<React.SetStateAction<number>>
  required: boolean
}

// TODO: add number-only validation

export function FormNumberInput(props: FormNumberInputProps) {
  return (
    <>
      <FormControl sx={{ m: 1, width: 104 }}>
        <TextField
          id={`${props.label.toLowerCase()}-input`}
          label={props.label}
          variant="outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value as unknown as number)}
          required={props.required}
        />
      </FormControl>
    </>
  )
}
