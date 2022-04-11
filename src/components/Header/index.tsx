import styled from 'styled-components'
import { ConnectWalletButton } from '../ConnectWalletButton'
import Link from 'next/link'

const HeaderWrapper = styled.div`
  padding: 30px;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const MenuWrapper = styled.div`
  position: absolute;
  left: calc(50vw - 140px);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 20px;
`

const ItemMenu = styled.div`
  margin: 0px 15px;
  font-size: 22px;
  & a {
    text-decoration: none;
    color: white;
  }
`

export default function Header() {
  return (
    <HeaderWrapper>
      <ConnectWalletButton />
      <MenuWrapper>
        <ItemMenu>
          <Link href={'/'}>Home</Link>
        </ItemMenu>
        <ItemMenu>
          <Link href={'/view-all-scores'}>All scores</Link>
        </ItemMenu>
      </MenuWrapper>
    </HeaderWrapper>
  )
}
