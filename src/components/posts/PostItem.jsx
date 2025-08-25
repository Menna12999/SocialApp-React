import { Avatar, Button, Card } from "flowbite-react";
import { MdInsertComment } from "react-icons/md";
import { Link } from "react-router-dom";
import CommentPostHeader from "./CommentPostHeader";
import AddComment from "./AddComment";


export function PostIem({ post,showAllComments = false }) {
  const {
    body,
    image,
    user,
    createdAt,
    comments,
    _id
  } = post;
  console.log(post)
  return (
    <Card className="max-w-2xl mx-auto mb-4 shadow-2xl dark:bg-gray-700">
      {/******header******* */}
      <CommentPostHeader user={{...user,createdAt,body,image}} itemId={_id} isComment={false} image={image}/>
      {/************content******************** */}
      

     {image&& <img src={image} alt={body} />}

      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
      <div className="flex gap-2 items-center text-gray-700">
        <MdInsertComment fontSize={"20px"} />
        {comments && comments.length}
      </div>
      {showAllComments?'':
      <Button as={Link} to={`/postDetails/${_id}`} className="cursor-pointer">
      View More Comments
      <svg
        className="-mr-1 ml-2 h-4 w-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </Button>}
      {/***** comments********/}
      {comments&&comments.length>0&&(showAllComments?(comments.map((comment)=><CommentPostHeader isComment={true} key={comment._id} itemId={comment._id} user={{...comment.commentCreator,createdAt:comment.createdAt,body:comment.content}}/>)):(
     <CommentPostHeader isComment={true} itemId={comments[comments.length-1]._id} user={{...comments[comments.length-1].commentCreator,createdAt:comments[comments.length-1].createdAt,body:comments[comments.length-1].content}} />
     )) }
    <AddComment post={_id}/>
    </Card>
  );
}
