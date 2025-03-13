export default function CardBestSeller() {
    const productSellers: { name: string, price: number, img: string }[] = [
        {
            name: "Nike Air Max 270",
            price: 150,
            img: "/images/products/WMNSNIKEP-6000.png"
        },
        {
            name: "Adidas Ultraboost",
            price: 180,
            img: "adidas_ultraboost.jpg"
        },
        {
            name: "Puma RS-X",
            price: 120,
            img: "puma_rsx.jpg"
        }
    ];

    return (
        <div className="relative offset-0 mt-10">
        <span className="absolute top-0 left-0 bg-white mx-5 my-5   border-2 border-amber-950 ">Best Seller</span>
        <img src={productSellers[0].img} alt="product" className="w-full h-[30rem] object-cover object-contain rounded-xl" />
         
        </div>
    );
}
