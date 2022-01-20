import { DatePicker } from '@mui/lab'
import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { NewExchangeFormValues } from '../NewExchangeForm'

// const marks = [
//   {
//     value: 20,
//     label: '$20',
//   },
//   {
//     value: 50,
//     label: '$50',
//   },
//   {
//     value: 100,
//     label: '$100',
//   },
//   {
//     value: 150,
//     label: '$150+',
//   },
// ]

const ExchangeInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<NewExchangeFormValues>()

  const allowOnlyNumber = (value: string): string =>
    value
      .replace(/[^0-9]/g, '')
      .replace(/^0+/, '')
      .slice(0, 5)

  return (
    <>
      <TextField
        label="Exchange Name"
        error={Boolean(errors.information?.name)}
        helperText={errors.information?.name?.message}
        inputProps={{
          ...register('information.name', {
            required: 'Please enter a name for your exchange.',
          }),
        }}
      />
      <Controller
        name="information.budget"
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Budget"
            onChange={(e) => field.onChange(allowOnlyNumber(e.target.value))}
            sx={{ width: 125 }}
            type="text"
            InputProps={{ startAdornment: '$' }}
          />
        )}
      />
      {/* <Controller
        name="information.budget"
        defaultValue=""
        render={({ field }) => (
          <Slider
            {...field}
            onChange={(e, value) => {
              setBudget(allowOnlyNumber(value.toString()))
            }}
            step={5}
            max={150}
            valueLabelDisplay="auto"
            marks={marks}
          />
        )}
      /> */}
      <Controller
        name="information.date"
        defaultValue={null}
        render={({ field }) => (
          <DatePicker
            {...field}
            label="Exchange Date"
            minDate={new Date()}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
    </>
  )
}

export default ExchangeInformation