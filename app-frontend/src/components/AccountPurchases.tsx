import { useEffect, useState } from "react"
import purchaseService from "../services/purchaseService";
import { useAuth } from "@clerk/clerk-react";
import type { Purchase } from "../types/types";
import { List, Steps } from 'antd';
import { statusSteps, statusToStepIndex, formatDate } from "../lib/product";

const AccountPurchases = () => {
    const { getToken } = useAuth();
    const [loadingPurchases, setLoadingPurchases] = useState<boolean>(true);
    const [accountPurchases, setAccountPurchases] = useState<Purchase[] | undefined>();

    const fetchAccountPurchases = async () => {
        try {
            setLoadingPurchases(true);
            const token = await getToken();

            const data = await purchaseService.getAccountPurchases(token);

            console.log(data)
            setAccountPurchases(data)
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingPurchases(false)
        }
    };

    useEffect(() => {
        fetchAccountPurchases()
    }, [])

    return (
        <div className='flex flex-1 flex-col items-center p-10'>
            {loadingPurchases ? (
                <div>Loading purchases...</div>
            ) : (
                <div className="mb-5 w-full min-h-280.75 min-w-62.5 max-w-150 bg-slate-300 p-10 rounded-2xl">
                    <List
                        itemLayout="vertical"
                        size="small"
                        pagination={{
                            pageSize: 3,
                            position: "bottom",
                            align: "center"
                        }}
                        dataSource={accountPurchases}
                        renderItem={(accountPurchase) => (
                            <List.Item
                                key={accountPurchase.id}
                                actions={[
                                    <div className="flex flex-col items-start">
                                        <div>{accountPurchase.deliveryDetails.email}</div>
                                        <div>{accountPurchase.deliveryDetails?.addressLine1}</div>
                                        <div>Total Price: {accountPurchase.totalCount / 100}e</div>
                                    </div>
                                ]}
                                extra={
                                    <div className="my-4">
                                        <Steps orientation="vertical" current={statusToStepIndex[accountPurchase.status]} items={statusSteps} size="small" />
                                    </div>
                                }
                            >
                                <List.Item.Meta
                                    title={<div className="mt-4">{formatDate(accountPurchase.createdAt)}</div>}
                                    description={accountPurchase.status}
                                />
                                {accountPurchase.products.map((product) => (
                                    <div key={product.id} className="my-4">
                                        <div>{product.name}</div>
                                        <div>Quantity: {product.qty}</div>
                                    </div>
                                ))}
                            </List.Item>
                        )
                        }
                    />
                </div >
            )}
        </div >
    )
}

export default AccountPurchases