import React from 'react'
import { TopRating } from '../../components/TopRatings/TopRating';
import { Subtitle, Box } from './../../../styles/blocks';

export const UserListPage = () => 
<>
  <Box Padding="10px">
    <Subtitle textAlign="center">User List</Subtitle>
    <TopRating maxItems={Number.MAX_SAFE_INTEGER}/>
  </Box>
</>
