import { useState, useEffect } from "react"
import { TextField, FormControl } from "@mui/material"

interface FormNumberInputProps {
  value: string
  label: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  required: boolean
}

export function FormNumberInput(props: FormNumberInputProps) {
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const numVal = Number.parseFloat(props.value)
    if (!Number.isInteger(numVal) || numVal < 0 || numVal % 1 !== 0) {
      setErrorMessage("Please enter a positive integer")
      setIsError(true)
    } else if (errorMessage !== "") {
      setErrorMessage("")
      if (isError) {
        setIsError(false)
      }
    }
  }, [props.value])

  return (
    <>
      <FormControl sx={{ m: 1, width: 104 }}>
        <TextField
          id={`${props.label.toLowerCase()}-input`}
          label={props.label}
          variant="outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          required={props.required}
          helperText={errorMessage}
          error={isError}
        />
      </FormControl>
    </>
  )
}
