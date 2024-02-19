import NavBar from "../Components/Navbar/Navbar";
import React from 'react'
import Read from "../Components/ListAllPublications/Read";


export default function ListAllpublications() {
  return (
    <div>
      <NavBar />
      <h1>All Publications</h1>
      <Read />
    </div>
  )
}
