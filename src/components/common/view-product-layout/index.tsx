"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useSession } from "~/hooks/use-session";
import { ProductService } from "~/services/product.service";
import { cn } from "~/utils/utils";
import { ProductImageCarousel } from "../carousel";
import CustomButton from "../common-button/common-button";
import { StarRating } from "../rating/star";

export function ViewProductLayout({ productService }: { productService: ProductService }) {
  const searchParameters = useSearchParams();
  const productID = searchParameters.get("product_id");
  const [product, setProduct] = useState<IProduct>();
  const { user } = useSession();

  useEffect(() => {
    const fetchProduct = async () => {
      if (productID) {
        const product = await productService.getProductById(productID);
        setProduct(product);
      }
    };
    fetchProduct();
  }, [productID, productService]);

  const [isExpanded, setIsExpanded] = useState(false);

  const description = `Lorem ipsum eurolip: viva nyvir terast, beligi. Tinyng dena pros tetragisala, dar ultraska astrodadis. Ninca
    bizonnat sydovie och disejortad, reel och nektigt epogisk fagsik endotet ifall trernfaktisk dobektig.
    Jumbeat digital villing variet. Intravasse autongen nagon, nöselingbar egorad, innan vytöra datas som
    tiverar, tar. Koktiga ortoktig om spogi phippo padio gon eper. Sed konsejo gol och olisi plåtiga att fara,
    sedat i ren i takvisnins. Juje sasseligi en att tiivis utom trefaleries beprecis i homoliga i onale, den
    nesade radiocepiton. Synt mis ansam lelingar i kroheten att sotögen att egojusonde i rom respektive kontrad
    mikrossa mitfoligt. Miv dinur och blikad, seda om än kvasiit öna. Al etnovalens resultat problem aktivitet
    med. Ete: normen avsed i homet på kunst presenter. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore hic voluptate tempora laudantium
	aperiam sunt sint accusantium doloremque, itaque asperiores ab excepturi blanditiis veniam, minima debitis impedit, reiciendis eligendi id. Lorem ipsum`;

  const isLongDescription = description.trim().split(" ").length > 10;

  return (
    <section className="mx-auto grid max-w-[990px] grid-cols-1 gap-6 rounded-lg md:grid-cols-12">
      {/* Main Content Section */}
      <main className="md:col-span-8">
        {/* Product Image and Header */}
        <header className="mb-4">
          <ProductImageCarousel images={product?.cover_photos || []} />
          <div className={`rounded-md border p-4`}>
            <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">{product?.title}</h1>
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user?.logo || ""} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className={`font-bold`}>{user?.name}</span>
              </p>
              <div className="flex items-center gap-2">
                <StarRating rating={product?.avg_rating} />
                <span className="font-bold">{product?.avg_rating} ratings</span>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className={`mb-4 rounded-md border p-4`}>
          <h2 className="mb-4 border-b py-4 text-xl font-bold text-gray-900">Features</h2>
          <ul className="list-inside list-disc space-y-4 text-gray-700">
            {product?.highlights.map((highlight, index) => <p key={index}>✔️ {highlight}</p>)}
          </ul>
        </section>

        {/* Description Section */}
        <section className="mb-4 rounded-md border p-4">
          <h2 className="mb-4 border-b py-4 text-xl font-bold text-gray-900">Description</h2>
          <div>
            <p
              className={cn("text-gray-700 transition-all duration-300", {
                "line-clamp-3": !isExpanded,
              })}
            >
              <span dangerouslySetInnerHTML={{ __html: product?.description || "" }} />
            </p>
            {isLongDescription && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-blue-500 hover:underline focus:outline-none"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </section>
      </main>

      {/* Sidebar Section */}
      <aside className="md:col-span-4">
        {/* Price and Action Buttons */}
        <section className="rounded-md border p-4">
          <div className="mb-8">
            <div className={`flex items-center justify-between rounded-md bg-low-purple p-2`}>
              <p className="font-semibold">Sold</p>
              <p className="text-sm font-semibold">{product?.total_order}</p>
            </div>
            <div className="mb-7 mt-4 flex items-center gap-2">
              <span className="text-2xl font-bold">N{product?.price.toLocaleString()}</span>
              <span className="text-destructive line-through">₦{product?.discount_price.toLocaleString()}</span>
            </div>
            <div className="flex flex-col gap-2">
              <CustomButton
                isDisabled={user?.id === product?.user_id}
                variant={`primary`}
                className={cn({ "cursor-not-allowed": user?.id !== product?.user_id })}
              >
                Add to Cart
              </CustomButton>
              <CustomButton
                isDisabled={user?.id === product?.user_id}
                variant={`outline`}
                className={cn({ "cursor-not-allowed": user?.id === product?.user_id }, "border-primary text-primary")}
              >
                Buy Now
              </CustomButton>
            </div>
          </div>

          {/* Product Includes Section */}
          <div className="">
            <p className="mb-4 border-b py-4 font-bold">The Product Includes</p>
            <div className="list-disc space-y-4">
              <div className="flex items-center justify-between">
                <span>Format</span>
                <span>MP4</span>
              </div>
              <div className="flex items-center justify-between">
                <span>File Type</span>
                <span>{product?.product_type.replace("_", " ")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Articles</span>
                <span>7</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Resources</span>
                <span>4</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <p className="text-sm font-semibold">Share</p>
              <p className="text-sm font-semibold">Give as Gift</p>
            </div>
          </div>
        </section>

        {/* Product Reviews Section */}
        <section className="mt-4 rounded-md border p-4">
          <div className="mb-4 flex items-center justify-between border-b pb-4">
            <p className="font-bold">Product Reviews</p>
            <p className="text-sm font-semibold text-mid-grey-II">24 reviews</p>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="">
                <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Telius anest nulla nam elit vivem.</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-[10px] font-semibold">Tomlade Openly</p>
                  </div>
                  <StarRating size={`text-xs`} rating={4} />
                  <p className="text-[10px]">2 months ago</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </section>
  );
}
