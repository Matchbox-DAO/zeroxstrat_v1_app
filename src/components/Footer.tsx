import Image from 'next/image'

import discord from '../assets/discord.png'
import file from '../assets/file.png'
import github from '../assets/github.png'
import matchbox from '../assets/matchbox.png'
import topology from '../assets/topologyWhite.png'
import styled from 'styled-components'
import { Link } from 'rebass'

const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  //min-height: 140px;
`
const SubFooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  //margin-top: 50px;
  min-height: 140px;
  //align-items: flex-start;
`

const ImagesContainer = styled.div`
  width: 50%;
  @media (max-width: 900px) {
    width: 100%;
  }
  display: flex;
  justify-content: space-around;
`

const SubImagesContainer = styled.div`
  width: 50%;
  @media (max-width: 900px) {
    width: 100%;
  }
  display: flex;
  justify-content: space-around;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const TextContainer = styled.div`
  align-items: center;
  text-align: center;
  width: 100%;
`

const LogoContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  width: ${(props: { logoSize: number }) => props.logoSize}px;
  height: ${(props: { logoSize: number }) => props.logoSize}px;
`

const Footer = () => {
  const imgSize = 40
  const logoSize = 80
  return (
    <>
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
      <Divider />
      <TextContainer> Brought to you by</TextContainer>
      <SubFooterDiv>
        <SubImagesContainer>
          <LogoContainer logoSize={logoSize}>
            <Link href="https://twitter.com/topology_gg" target="_blank">
              <Image width={logoSize} height={logoSize} src={topology} alt="Topology" objectFit="contain" />
            </Link>
          </LogoContainer>
          <LogoContainer logoSize={logoSize}>
            <Link href="https://twitter.com/matchbox_dao" target="_blank">
              <Image width={logoSize} height={logoSize} src={matchbox} alt="matchbox DAO" objectFit="contain" />
            </Link>
          </LogoContainer>
        </SubImagesContainer>
      </SubFooterDiv>
    </>
  )
}

export default Footer
