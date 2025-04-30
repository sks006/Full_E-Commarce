/** @format */

import Layout from "@/components/layout/Layout";
import ProductFilter from "@/components/filter/ProductFilter";

const Shop = () => {
     return (
          <Layout>
               <div className='container mx-auto px-4 py-8'>
                    <div className='flex flex-col md:flex-row gap-6'>
                         {/* Slicer Section */}
                         <aside className='w-full md:w-64'>
                              <ProductFilter />
                         </aside>

                         {/* Products Grid Section */}
                         <main className='flex-1'>
                              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                   {/* Product grid will go here */}
                              </div>
                         </main>
                    </div>
               </div>
          </Layout>
     );
};

export default Shop;
