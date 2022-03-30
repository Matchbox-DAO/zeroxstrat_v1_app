import styled from 'styled-components'
import { ConnectWalletButton } from '../ConnectWallet'

const HeaderWrapper = styled.div`
  padding: 30px;
  position: relative;
`

export default function Header() {
  return (
    <HeaderWrapper>
      <ConnectWalletButton />
    </HeaderWrapper>
  )
}
