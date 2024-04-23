'use client';

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function ComposeBlog() {
  const [tagName, setTagName] = useState('p');
  // Define a component for dynamic element rendering
  const DynamicElement = ({ tagName, children }) => {
    // Use the 'tagName' prop to render the element dynamically
    return React.createElement(tagName, null, children);
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-slate-200">
      <div className="relative  w-[30rem] h-[40rem]">
        <Select onValueChange={setTagName}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Tag" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectLabel>Tags</SelectLabel>
              <SelectItem value="h1">h1</SelectItem>
              <SelectItem value="h2">h2</SelectItem>
              <SelectItem value="h3">h3</SelectItem>
              <SelectItem value="p">p</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <DynamicElement tagName={tagName}>
        Hello, I am {tagName}
      </DynamicElement>
    </div>
  );
}

export default ComposeBlog;
