'use client';

import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../../axios";

function Profile({ searchParameters }: { searchParameters: { id: string } }) {

    const { data, error } = useQuery({
        queryKey: ['profile', searchParameters.id],
        queryFn: () => makeRequest.get(`users/get-user?id=` + searchParameters.id).then((res) => {
            return res.data[0]
        })
    })

    if (error) {
        console.log(error)
    }
    console.log(data)

    return (
        <div>{searchParameters.id}</div>
    );
}
export default Profile;