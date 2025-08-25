import React from 'react'
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function ValidationError({error}) {
  return (
<Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">{error}</span>
    </Alert>
  )
}
