import React from 'react'

const Profile = ({ params } : {params : {id: string}}) => {
  return (
    <div>My id is wait {params.id}</div>
  )
}

export default Profile