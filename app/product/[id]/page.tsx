import { Product } from "@/app/Entities/Products";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchProduct(id: string): Promise<Product | null> {
  if (!id) return null;

  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return (
      <main className="p-4">
        <h1>Product not found</h1>
        <p>Sorry, this product does not exist or could not be loaded.</p>
      </main>
    );
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Category:</strong> {product.category.name} (ID:{" "}
        {product.category.id})
      </p>

      <div>
        <strong>Category Image:</strong>
        <img
          src={product.category.image}
          alt={product.category.name}
          width={100}
        />
      </div>

      <div className="mt-4">
        <strong>Images:</strong>
        <div className="flex flex-wrap gap-2 mt-2">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.title} ${i + 1}`}
              width={200}
              className="border border-gray-300 rounded"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
