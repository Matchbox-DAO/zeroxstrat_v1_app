import Image from 'next/image'

import discord from '../assets/discord.png'
import file from '../assets/file.png'
import github from '../assets/github.png'
// import matchbox from '../assets/matchbox.png'
import styled from 'styled-components'
import { Link } from 'rebass'

const FooterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  height: 100px;
`

const ImagesContainer = styled.div`
  width: 50%;
  @media (max-width: 900px) {
    width: 100%;
  }
  display: flex;
  justify-content: space-around;
`

const Footer = () => {
  const imgSize = 40
  return (
    <FooterDiv>
      <ImagesContainer>
        <Link href="https://discord.gg/X2FSUngpwe" target="_blank">
          <Image width={imgSize} height={imgSize} src={discord} alt="Discord" objectFit="contain" />
        </Link>
        <Link href="https://mirror.xyz/matchboxdao.eth/XDHA0jqmdXvQDd247ebknsFkXGLG4VfSlGbcU2v6B10" target="_blank">
          <Image width={imgSize} height={imgSize} src={file} alt="Blog post" objectFit="contain" />
        </Link>
        <Link href="https://github.com/Matchbox-DAO/fountain/tree/v0.1/examples/puzzle_v1" target="_blank">
          <Image width={imgSize} height={imgSize} src={github} alt="Github" objectFit="contain" />
        </Link>
      </ImagesContainer>
    </FooterDiv>
  )
}

export default Footer
