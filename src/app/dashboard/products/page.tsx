import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import { ProductCard } from "@/products";
import { products } from "@/products/data/products";
import { redirect } from "next/navigation";

export default async function ProductsPage() {

   const user = await getUserServerSession()
  
    if(!user) redirect('/api/auth/signin');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        products.map((product) => (
          <ProductCard key={product.id} {...product}/>
        ))
      }

    </div>
  );
}