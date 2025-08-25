import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  Textarea,
} from "flowbite-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AppButton from "../Shared/AppButton";

export default function CommentPostHeader({
  user: { name, photo, createdAt, body ,_id},
  image,
  isComment = false,
  itemId,
}) {
  console.log(image);
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null); 
  const {userData} = useContext(AuthContext)
  
console.log(userData)
  const { register, handleSubmit } = useForm();
  const { mutate: handleDeleteItem } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      toast.success(`${isComment ? "Comment" : "Post"} deleted successfully`),
        {
          position: "top-right",
        };
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
    },

    onError: () => {
      toast.error(`${isComment ? "Comment" : "Post"} deleted failed`),
        {
          position: "top-right",
        };
    },
  });

  async function deleteItem() {
    const endPoint = isComment ? "comments" : "posts";
    return await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/${endPoint}/${itemId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  const {  mutate: handleUpdateItem} = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      toast.success(`${isComment ? "Comment" : "Post"} updated successfully`),
        {
          position: "top-right",
        };
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
      setEdit(false);
    },

    onError: (error) => {
      console.log(error);
      toast.error(`${isComment ? "Comment" : "Post"} updated failed`),
        {
          position: "top-right",
        };
    },
  });
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }
  async function updateItem(data) {
    if (isComment) {
      return await axios.put(
        `${import.meta.env.VITE_BASE_URL}/comments/${itemId}`,
        data,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    } else {
      const formData = new FormData();
      formData.append("body", data.body);

      if (fileInputRef?.current?.files[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      }

      return await axios.put(
        `${import.meta.env.VITE_BASE_URL}/posts/${itemId}`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    }
  }

  return (
    <>
      {edit && (
       <>
        <form onSubmit={handleSubmit(handleUpdateItem)} className="relative">
          {!isComment && (
            <>
              {" "}
              <input
                type="file"
                {...register("image")}
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />{" "}
             
 { preview ?  <img
    src={preview}
    className="w-full mx-auto mb-3"
    onClick={() => fileInputRef.current.click()}
  />
 : 
  <img
    src={image}
    className="w-full mx-auto mb-3"
    onClick={() => fileInputRef.current.click()}
  />
}
            </>
          )}
          {isComment ? (
            <Textarea
              className="bg-gray-100  dark:bg-gray-700 dark:text-white mb-2 p-5 rounded-xl"
              defaultValue={body}
              {...register("content")}
            />
          ) : (
            <Textarea
              className="bg-gray-100  dark:bg-gray-700 dark:text-white mb-2 p-5 rounded-xl"
              defaultValue={body}
              {...register("body")}
            />
          )}
          <Button
            type="submit"
            className="bg-transparent  hover:bg-transparent outline-0 border-0 focus:ring-0 absolute bottom-5 right-2 text-gray-500 cursor-pointer"
          >
            <IoSend size={20} className="text-sky-700" />
          </Button>

        </form>
                  <AppButton className='w-fit cursor-pointer' onClick={()=>setEdit(false)}>Close</AppButton>
       </>

      )}
      <div className={`${isComment ? "bg-gray-100  dark:bg-gray-800 dark:text-white mb-2 p-3 rounded-xl" : ""}`}>
        <header className="flex items-center justify-between">
          <div className="flex items-center">
            <picture>
              <Avatar
                img={
                  !photo.includes("undefined")
                    ? photo
                    : `${
                        import.meta.env.VITE_BASE_URL
                      }/uploads/default-profile.png`
                }
                alt={name}
                rounded
                className="me-4"
              />
            </picture>

            <div>
              <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {name}
              </h2>
              <span>
                {new Date(createdAt).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
       {userData._id==_id&&   <Dropdown inline label="">
            <DropdownItem
              onClick={() => setEdit(true)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
            </DropdownItem>

            <DropdownItem
              onClick={handleDeleteItem}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </DropdownItem>
          </Dropdown>}
        </header>
        <h3
          className={`text-2xl font-bold break-words overflow-hidden whitespace-pre-wrap tracking-tight text-gray-900 dark:text-white ${
            isComment ? "text-lg ps-14" : ""
          }`}
        >
          {body}
        </h3>
      </div>
    </>
  );
}

