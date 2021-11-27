import { PrismaClient } from "@prisma/client";
let db = new PrismaClient();

async function seed() {
  await Promise.all(
    getProducts().map(product => db.product.create({ data: product }))
  );
}

seed();

function getProducts() {
  return  [
    {
      image:
        'https://d0bb7f9bf11b5ad1a6b2-6175f06f5e3f64e15abbf67415a276ec.ssl.cf1.rackcdn.com/product-images/designlab/6-panel-unconstructed-brushed-cotton-caps-cap02-black1582879924.jpg',
      name: 'Cotton Ballcap',
      price: 25
    },
    {
      image:
        'https://media.everlane.com/image/upload/c_fill,dpr_1.0,f_auto,g_face:center,q_auto,w_auto:100:1200/v1/i/c5838652_bd67.jpg',
      name: 'White Boot',
      price: 115
    },
    {
      image:
        'https://cdni.llbean.net/is/image/wim/233155_467_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
      name: 'LL Bean Raincoat',
      price: 75
    }
  ]
}