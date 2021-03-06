import React from "react";
import type { ActionFunction} from "remix";
import {
  Link,
  LinksFunction,
  LoaderFunction,
  useLoaderData,redirect, Form,
} from "remix";

import { db } from "~/utils/db.server";

import stylesUrl from '../../styles/product.css'

export let action: ActionFunction = async ({
  request
}): Promise<Response> => {

  let form = await request.formData();
 
  let id = form.get('_method')
  
  await db.product.delete({
    where:{
      id
    }
  });

  return redirect('/products');
};

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: stylesUrl
    }
  ];
};

type LoaderData = {
  products:[{id:string, name:string,image:string, price:number}]
}

export let loader: LoaderFunction = async ({ request }) => {
    
    let products = await db.product.findMany()
    
    let data: LoaderData = {
      products
    };

    return data;
  };



export default function ProductsPage(){
    let data = useLoaderData<LoaderData>();
    
    return(
      <div>
        <div className ='products'>
          {data.products.map(({ id, image, name, price }) => (
            <div key={id} className ='product-detail'>
              <img src={image} alt={name} />
              <span className='product-title'>{name}</span>
              <span>${price}</span>
              <div className ='button-row'>
               <Form  action='/products?index' method='post' >
                  <input type="hidden" name="_method" value={id} />
                  <button 
                    type='submit'
                    className ='delete-button'>
                      Delete
                  </button>
                </Form>
                <Link className='link-style' to={`/products/${id}`}><button className ='update-button' >Update</button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}