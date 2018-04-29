import gql from 'graphql-tag';

export const ALL_TALKS_QUERY = gql`
  query AllTalksQuery {
    allTalks {
      _id
      name
      conferenceName
      video
      votes
      description
      speakerName
      date
    }
  }
`;

/* eslint-disable */
export const TBD = console.log('Nothing here yet');
