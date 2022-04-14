import styled from 'styled-components'
import Scoreboard from '~/components/Scoreboard'

const ViewAllScoresWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  padding-top: 150px;
  position: relative;
`

const ViewAllScores = () => {
  return (
    <ViewAllScoresWrapper>
      <Scoreboard withPagination />
    </ViewAllScoresWrapper>
  )
}

export default ViewAllScores
