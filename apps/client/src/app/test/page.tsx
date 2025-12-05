import { auth } from "@clerk/nextjs/server";

export default async function TestPage() {
  const { getToken } = await auth();
  const token = await getToken();

  const resProduct = await fetch(`http://localhost:8003/test`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataProduct = await resProduct.json();
  console.log(dataProduct);

  const resOrder = await fetch(`http://localhost:8001/test`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataOrder = await resOrder.json();
  console.log(dataOrder);
  
  const resPayment = await fetch(`http://localhost:8002/test`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataPayment = await resPayment.json();
  console.log(dataPayment);

  return <div className="">Test Page</div>;
}
