import React from 'react'
import { Button, Spinner} from "flowbite-react";

export default function AppButton({children,isLoading,disabled,...props}) {
  return (
         <Button type="submit" disabled={disabled} {...props}>
          {isLoading&&(                  <Spinner aria-label="Alternate spinner button example" size="sm" />
)}
                  {children}</Button>
   
  )
}
