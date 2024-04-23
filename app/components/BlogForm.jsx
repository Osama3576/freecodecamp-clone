/* eslint-disable @next/next/no-img-element */
'use client';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';

function BlogForm() {
  const [imageSrc, setImagesrc] = useState('');
  const [addCode, setAddCode] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      mainHeading: '',
      image: '',
      sections: [{ subHeading: '', paragraph: '', codeSnippet: '' }],
    },
  });

  const [value, setBlogValue] = useState(getValues());

  const addSection = () => {
    const newSection = {
      subHeading: '',
      paragraph: '',
      codeSnippet: '',
    };
    setBlogValue({
      ...value,
      sections: [...value.sections, newSection],
    });
  };

  const onSubmit = async function (data) {
    try {
      const reader = new FileReader();
      const image = data.image[0];
      reader.readAsDataURL(image);

      reader.onload = () => {
        const imageData = reader.result;
        const newData = { ...data, image: imageData };

        setImagesrc(imageData);
        // Once image data is loaded, make the POST request
        axios
          .post('/api/compose', newData, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(() => {
            toast.success('Successfully added');
            reset(); // Reset form after successful submission
          })
          .catch(error => {
            if (error.response && error.response.status === 409) {
              toast.error(
                'Main heading already exists. Please choose a different main heading.'
              );
            } else {
              console.error('Error:', error);
              toast.error(
                'An error occurred while adding the post. Please try again later.'
              );
            }
          });
      };
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while processing the image.');
    }
  };

  return (
    <div className="shadow-xl w-[20rem] md:w-[35rem] rounded-2xl mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 p-4"
      >
        <div className="flex flex-col gap-4">
          <label>Main Heading:</label>
          <Input {...register('mainHeading')} type="text" />
        </div>

        <div className="flex flex-col gap-4">
          <label>Image:</label>
          <Input
            {...register('image')}
            type="file"
            // onChange={handleFileChange}
          />

          <img src={imageSrc} alt="img" />
        </div>

        {value.sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-4">
            <label>Sub Heading {index + 1}:</label>
            <Input
              type="text"
              {...register(`sections[${index}].subHeading`)}
            />

            <div className="flex flex-col gap-4">
              <label>Paragraph {index + 1}:</label>
              <Input
                {...register(`sections[${index}].paragraph`)}
                type="text"
              />
            </div>
            {/* code snippet */}
            {addCode && (
              <div className="flex flex-col gap-4">
                <label>Code Snippet {index + 1}:</label>
                <Input
                  {...register(`sections[${index}].codeSnippet`)}
                  type="text"
                />
              </div>
            )}
          </div>
        ))}
        <Button type="button" onClick={addSection}>
          Add Section
        </Button>
        <Button type="button" onClick={() => setAddCode(true)}>
          Add Code
        </Button>
        <Button type="submit" disabled={isLoading}>
          Add Post
        </Button>
      </form>
    </div>
  );
}

export default BlogForm;
