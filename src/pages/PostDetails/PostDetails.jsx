import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostIem } from "../../components/posts/PostItem";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

export default function PostsDetails() {
  const { id } = useParams();
      const {userData}=useContext(AuthContext)
  
  
 const {data,isLoading,isError,error} =useFetch(['post-details',id],`/posts/${id}`,userData)
  return (
    <section className="py-12">
      <div className="container">
        {isLoading && <p>loading.....</p>}
        {error && <p>{error}</p>}
        {data && <PostIem post={data.post} showAllComments={true} />}
      </div>
    </section>
  );
}
