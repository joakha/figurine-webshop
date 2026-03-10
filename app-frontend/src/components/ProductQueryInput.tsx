import { Input, Select } from 'antd';
import type { GetProps } from 'antd';
import { productPriceSortingOptions, productCategories } from '../lib/product';
import { useState, useEffect } from 'react';
import type { ProductType } from '../types/types';
import productService from '../services/productService';
import ProductCard from './ProductCard';
import PaginationBar from './PaginationBar';

const ProductQueryInput = () => {

    type QueryProps = GetProps<typeof Input.Search>;

    const { Search: Query } = Input;

    //states for querying products
    const [productName, setProductName] = useState<string>("");
    const [productCategory, setProductCategory] = useState<string>("");
    const [priceOption, setPriceOption] = useState<string>("HIGHEST");

    //found products
    const [foundProducts, setFoundProducts] = useState<ProductType[]>([]);
    const [totalProducts, setTotalProducts] = useState<number>(0);

    //states for pagination
    const [pageNo, setPageNo] = useState<number>(1);

    const onSearch: QueryProps['onSearch'] = (value) => {
        setProductName(value);
    }

    const handleCategory = (value: string) => {
        setProductCategory(value);
    };

    const handlePrice = (value: string) => {
        setPriceOption(value);
    };

    const onPaginationChange = (page: number) => {
        setPageNo(page);
    }

    const fetchProducts = async () => {
        try {
            const productData = await productService.fetchProducts(productName, productCategory, priceOption, pageNo.toString());
            setFoundProducts(productData.products);
            setPageNo(productData.currentPage);
            setTotalProducts(productData.totalProducts)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [productName, productCategory, priceOption, pageNo])

    return (
        <div className='flex flex-col min-h-screen'>
            <div className="flex flex-col items-center gap-10 w-full min-w-62.5 max-w-150 grow">
                <div className='flex px-2'>
                    <Select
                        defaultValue="disabled"
                        style={{ width: 120, height: 40, marginRight: 2 }}
                        onChange={handleCategory}
                        options={productCategories}
                    />
                    <Select
                        defaultValue="disabled"
                        style={{ width: 120, height: 40, marginLeft: 2, marginRight: 2 }}
                        onChange={handlePrice}
                        options={productPriceSortingOptions}
                    />
                    <Query
                        style={{ marginLeft: 2 }}
                        placeholder="Query products"
                        allowClear
                        enterButton="Find"
                        size="large"
                        minLength={2}
                        onSearch={onSearch}
                    />
                </div>
                <div>
                    {totalProducts > 0 ? (
                        `${totalProducts} products found:`) : (
                        "No products found")}
                </div>
                <div className='grid grid-cols-2 gap-10'>
                    {foundProducts.map((product) => (
                        <div key={product.name} className="w-70">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center'>
                <PaginationBar
                    total={totalProducts}
                    current={pageNo}
                    onChange={onPaginationChange}
                />
            </div>
        </div>
    )
}

export default ProductQueryInput