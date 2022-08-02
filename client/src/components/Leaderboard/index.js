import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';

function Leaderboard(props) {
    const {data} = useQuery(QUERY_USERS)
    if (data){
        let users = data.users;
        console.log('Here', users)
        var count = 1
        var rank;

        users.forEach(element => {

            if (element._id === props._id){
                rank = count
            }
            count++
        });
    }

    console.log('rank:',rank)

  return (
    <div>
        <h4 style={{width:"390px", marginTop:"15px"}}>You are at: #{rank} on the leaderboard</h4>
    </div>
  );
}

export default Leaderboard;