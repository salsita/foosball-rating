import React from 'react'
import { connect } from 'react-redux'
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineMarkSeries,
} from 'react-vis'

import { getRatingHistoryGraphForUser } from '../../modules/matches/matches-selectors'
import { Box, TextSpan } from '../../../styles/blocks'
import { plotAxisStyle, plotGridStyle, plotLineStyle, plotMarkStyle, plotMainGridStyle } from '../../../styles/svg'

const ProfileRatingGraph = props => (
  <Box Margin='0 5px 20px 5px'>
    <TextSpan>
      Rating history
    </TextSpan>
    <div>
      <FlexibleWidthXYPlot
        height={300}
        xType='time'
        margin={{ left: 45 }}
      >
        <HorizontalGridLines
          style={plotGridStyle}
        />
        <HorizontalGridLines
          style={plotMainGridStyle}
          tickValues={[1000]}
        />
        <VerticalGridLines />
        <XAxis
          style={plotAxisStyle}
          tickLabelAngle={-45}
        />
        <YAxis style={plotAxisStyle} />
        <LineMarkSeries
          data={props.ratingHistoryGraph}
          lineStyle={plotLineStyle}
          markStyle={plotMarkStyle}
        />
      </FlexibleWidthXYPlot>
    </div>
  </Box>
)


const mapStateToProps = (state, props) => ({
  ratingHistoryGraph: getRatingHistoryGraphForUser(state, props.userId),
})

export default connect(mapStateToProps)(ProfileRatingGraph)

