import { Input, Select } from 'antd';
import type { GetProps } from 'antd';
import { productPriceSortingOptions, productCategories } from '../lib/product';
import { useState, useEffect } from 'react';
import type { ProductType } from '../types/FormTypes';
import productService from '../services/productService';

const ProductQueryInput = () => {

    type QueryProps = GetProps<typeof Input.Search>;

    const { Search: Query } = Input;

    const [productName, setProductName] = useState<string>("");
    const [productCategory, setProductCategory] = useState<string>("");
    const [priceOption, setPriceOption] = useState<string>("HIGHEST");
    const [pageNo, setPageNo] = useState<string>("");
    const [foundProducts, setFoundProducts] = useState<ProductType[]>([]);

    const onSearch: QueryProps['onSearch'] = (value) => {
        if (!value || value.trim().length < 1) {
            console.log("Please enter at least 1 character");
            return;
        }

        setProductName(value);
    }

    const handleCategory = (value: string) => {
        setProductCategory(value);
    };

    const handlePrice = (value: string) => {
        setPriceOption(value);
    };

    const fetchProducts = async () => {
        try {
            const productData = await productService.fetchProducts(productName, productCategory, priceOption, pageNo);
            console.log(productData.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [productName, productCategory, priceOption, pageNo])

    return (
        <div className="flex items-center w-full min-w-62.5 max-w-150 ">
            <Select
                defaultValue="Category"
                style={{ width: 120, height: 40, marginRight: 2 }}
                onChange={handleCategory}
                options={productCategories}
            />
            <Select
                defaultValue="disabled"
                style={{ width: 100, height: 40, marginLeft: 2 }}
                onChange={handlePrice}
                options={productPriceSortingOptions}
            />
            <Query
                style={{ width: "100%", padding: "10px" }}
                placeholder="Query products"
                allowClear
                enterButton="Find"
                size="large"
                minLength={2}
                onSearch={onSearch}
            />
        </div>
    )
}

export default ProductQueryInput