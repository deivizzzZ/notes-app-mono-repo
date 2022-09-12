import styled from 'styled-components'
import { colors } from '../theme'

export const Button = styled.button`
  background: white;
  cursor: pointer;
  font-size: 1em;
  margin: 1em;
  padding: 4px 12px;
  border: 1px solid ${colors.primary};
  border-radius: 5px;
  transition: all .3s ease;

  &:hover {
    background: ${colors.primary};
  }
`
