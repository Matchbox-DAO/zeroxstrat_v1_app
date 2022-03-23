import Select from 'react-select'
import styled from 'styled-components'

export const StyledSelect = styled(Select)`
  flex: 1;
  display: block;
  font-size: 18px;
  color: #222;
  min-width: 172px;

  :focus-visible {
    outline: none;
  }

  .react-select__control {
    border-radius: 6px;
    /* width: 48%; */
    border: none;
    padding: 10px 15px;

    &:focus,
    &:focus-visible {
      outline: none;
    }

    &--is-focused {
      border: none;
      box-shadow: none;
    }
  }

  .react-select__placeholder {
    color: #dae5ef;
    font-weight: 300;
  }

  .react-select__indicators {
    align-self: center;
  }

  .react-select__dropdown-indicator {
    padding: 0;
  }

  .react-select__value-container {
    padding: 0;
    padding-right: 5px;
  }

  .react-select__input-container {
    margin: 0;
    padding: 0;
  }

  .react-select__option {
    &--is-focused {
      background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
    }

    &--is-selected {
      background-color: #a1c4fd;
      background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    }
  }
`
