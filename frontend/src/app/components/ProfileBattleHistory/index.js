import React, { Component } from 'react';
import { ListCon } from './../../../styles/blocks';
import { ProfileBattleHistoryRow } from './ProfileBattleHistoryRow';
import { TextSpan } from "../../../styles/blocks/typo"

export default (props) => (
  <>
    <TextSpan>
      Match history
    </TextSpan>
    <ListCon>
      {props.matches.map((match) =>
        <ProfileBattleHistoryRow key={match.id} match={match}/>
      )}
    </ListCon>
  </>
)
