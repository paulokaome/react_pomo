import { ButtonContainer, ButtonVariantColor } from './styles'

export interface ButtonProps {
  variant?: ButtonVariantColor
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}>DeDo</ButtonContainer>
}
