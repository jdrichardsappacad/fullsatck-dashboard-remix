import React from "react";
import type { ActionFunction } from "remix";
import { useActionData, redirect } from "remix";
import { db } from "~/utils/db.server";


const validateImage = (image:string) => {
    if(!image.includes('.jpg')) return ('ImageURL must have a .jpg extension')
}

const validateName = (name:string) => {
if(name.length <= 2) return 'Name must be 3 or more charachters'
}

const validatePrice = (price:number) => {
    if(typeof price !== 'number') return ('Price must be a number')
}



type ActionData = {
    formError?: string;
    fieldErrors?: {
      image: string | undefined;
      name: string | undefined;
    //   price: number | undefined;
    };
    fields?: {
      image: string;
      name: string;
      price: number;
    };
  };

  export let action: ActionFunction = async ({
    request
  }): Promise<Response | ActionData> => {
    let form = await request.formData();
    let image = await form.get('image')
    let name = await form.get('name');
    let price = await form.get('price');
    // if (
    //   typeof image !== "string" ||
    //   typeof name !== "string" ||
    //   typeof price !== "number"
    // ) {
    //   return { formError: `Form not submitted correctly.` };
    // }
  
    // let fieldErrors = {
    //   image: validateImage(image),
    //   name: validateName(name),
    // //   price: validatePrice(price)
    // };
    // let fields = { image, name, price };
    // if (Object.values(fieldErrors).some(Boolean)) {
    //   return { fieldErrors, fields };
    // }
  
    let product = await db.product.create({
      data: {image, name, price}
    });

    console.log('product', product)
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
                    // defaultValue={actionData?.fields?.image}
                    // value="image"
                    placeholder='Image Url'
                />
                {/* {actionData?.fieldErrors?.image ? (
                    <p
                    className="form-validation-error"
                    role="alert"
                    id="image-error"
                    >
                    {actionData.fieldErrors.image}
                    </p>
                ) : null} */}
                <input
                    type="text"
                    name="name"
                    placeholder='Product Name'
                />
                {/* {actionData?.fieldErrors?.name ? (
                    <p
                        className="form-validation-error"
                        role="alert"
                        id="name-error"
                    >
                    {actionData.fieldErrors.name}
                    </p>
                ) : null} */}
                <input
                    type='number'
                    name="price"
                    placeholder='Price'
                />
                {/* {actionData?.fieldErrors?.price ? (
                    <p
                        className="form-validation-error"
                        role="alert"
                        id="price-error"
                    >
                        {actionData.fieldErrors.price}
                    </p>
                ) : null} */}
                <button className='submit-button'>
                    Add Product
                </button>
            </form>
            
        </div>
    )
}