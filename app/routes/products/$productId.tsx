import React from "react";
import type {LoaderFunction,ActionFunction} from 'remix'
import {Form} from 'remix'

import { useLoaderData, redirect } from "remix";
import { db } from "~/utils/db.server";


type LoaderData = {
    product:{image:string, name:string, price:string}
}

export let loader: LoaderFunction = async ({ params }) => {
  
    let product = await db.product.findUnique({
        where:{
            id:params.productId
        }
    })
   
    let data: LoaderData = {
      product
    };

    return data;
};

  export let action: ActionFunction = async ({
    request, params
  }): Promise<Response> => {

    let form = await request.formData();
    let image = await form.get('image')
    let name = await form.get('name');
    let price = await form.get('price');
    let newPrice:number = price ? +price : 0
  
 
    await db.product.update({
        where:{
            id: params.productId
        },
        data: {image, name, price: newPrice}
    });

    return redirect('/products');
  };


export default function SingleProduct(){
    let data = useLoaderData<LoaderData>();
    return(
        <div>
            <Form method='post' action={`/products/${data.product.id}`}>
            <input
                    type="text"
                    name="image"
                    defaultValue={data.product.image}
                   
            />
             <input
                    type="text"
                    name="name"
                    defaultValue={data.product.name}
               
            />
             <input
                    type="text"
                    name="price"
                    defaultValue={data.product.price}
                   
            />
            <button type="submit" className='submit-button'>
                    Add Product
            </button>
            </Form>
        </div>
    )
}