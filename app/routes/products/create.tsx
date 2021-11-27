import React from "react";
import type { ActionFunction } from "remix";
import { useActionData, redirect } from "remix";
import stylesUrl from '../../styles/create.css'
import { db } from "~/utils/db.server";

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: stylesUrl
    }
  ];
};


const validateImage = (image:string) => {
    if(!image.includes('.jpg')) return ('ImageURL must have a .jpg extension')
}

const validateName = (name:string) => {
if(name.length <= 2) return 'Name must be 3 or more charachters'
}

const validatePrice = (price:number) => {
    if(price < 10) return ('Price must be higher than $10')
}



type ActionData = {
    formError?: string;
    fieldErrors?: {
      image: string | undefined;
      name: string | undefined;
      price: string | undefined;
    };
    fields?: {
      image: string;
      name: string;
      price: string;
    };
  };

  export let action: ActionFunction = async ({
    request
  }): Promise<Response | ActionData> => {
    let form = await request.formData();
    let image = await form.get('image')
    let name = await form.get('name');
    let price = await form.get('price');
    if (
      typeof image !== "string" ||
      typeof name !== "string" ||
      typeof price !== "string"
    ) {
      return { formError: `Form not submitted correctly.` };
    }
  
    let fieldErrors = {
      image: validateImage(image),
      name: validateName(name),
      price: validatePrice(+price)
    };

    let fields = { image, name, price };
    if (Object.values(fieldErrors).some(Boolean)) {
      return { fieldErrors, fields };
    }
  
    await db.product.create({
      data: {image, name, price: +price}
    });

     return redirect('/');
    
    
  };

export default function CreateProduct(){
    let actionData = useActionData<ActionData | undefined>();

    return(
        <div className='add-product'>
            <h3>Add A Product</h3>
            <form method="post" className='add-product'>
                <input
                    type="text"
                    name="image"
                    defaultValue={actionData?.fields?.image}
                    placeholder='Image Url'
                />
                {actionData?.fieldErrors?.image ? (
                    <p
                    className="errors"
                    role="alert"
                    id="image-error"
                    >
                    {actionData.fieldErrors.image}
                    </p>
                ) : null}
                <input
                    type="text"
                    name="name"
                    placeholder='Product Name'
                />
                {actionData?.fieldErrors?.name ? (
                    <p
                      className="errors"
                      role="alert"
                      id="name-error"
                    >
                    {actionData.fieldErrors.name}
                    </p>
                ) : null}
                <input
                    type='number'
                    name="price"
                    placeholder='Price'
                />
                {actionData?.fieldErrors?.price ? (
                    <p
                      className="errors"
                      role="alert"
                      id="price-error"
                    >
                        {actionData.fieldErrors.price}
                    </p>
                ) : null}
                <button className='submit-button'>
                    Add Product
                </button>
            </form>
            
        </div>
    )
}