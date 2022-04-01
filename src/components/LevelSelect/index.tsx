import styled from 'styled-components'
import { StyledSelect } from './styleds'
import { Controller, Control } from 'react-hook-form'

export type LevelOption = {
  value: string
  label: string
}

const options: LevelOption[] = [
  { value: '0', label: 'Level 0' },
  { value: '1', label: 'Level 1' },
  { value: '2', label: 'Level 2' },
  { value: '3', label: 'Level 3' },
  { value: '4', label: 'Level 4' },
]

export interface LevelSelectProps {
  control: Control
  setLevel: (level: string) => void
}

export default function LevelSelect({ control, setLevel }: LevelSelectProps) {
  return (
    <Controller
      name="level-select"
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value } }) => (
        <StyledSelect
          instanceId={'level-select'}
          id="level-select"
          components={{ IndicatorSeparator: () => null }}
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="Select a level"
          options={options}
          value={options.find((option) => option.value === value)}
          onBlur={onBlur}
          onChange={(newValue) => {
            onChange(newValue)
            const v = newValue as LevelOption
            setLevel(v.value)
          }}
        />
      )}
    />
  )
}
