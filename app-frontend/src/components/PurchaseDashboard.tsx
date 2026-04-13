import { useAuth } from "@clerk/clerk-react";
import { Table, Select, Card, Descriptions } from "antd";
import { useEffect, useState } from "react";
import type { Purchase } from "../types/types";
import purchaseService from "../services/purchaseService";
import { productStatuses } from "../lib/product";

const PurchaseDashBoard = () => {

  const { getToken } = useAuth();
  const [loadingPurchases, setLoadingPurchases] = useState<boolean>(true);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const fetchPurchases = async () => {
    try {
      setLoadingPurchases(true);
      const token = await getToken();

      const data = await purchaseService.getAccountPurchases(token);

      console.log(data)
      setPurchases(data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPurchases(false)
    }
  };

  useEffect(() => {
    fetchPurchases()
  }, [])

  const updatePurchaseStatus = async (purchaseId: string, status: string) => {
      try {
        setLoadingPurchases(true)
        const token = await getToken();

        const updatedPurchase = await purchaseService.updatePurchaseStatus(token, purchaseId, status)
        const updatedPurchases = purchases.map((purchase) => purchase.id === updatedPurchase.id ? updatedPurchase : purchase);
        setPurchases(updatedPurchases);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPurchases(false);
      }
  }

  const columns = [
    {
      title: "Account",
      key: "account",
      render: (_: any, purchase: Purchase) => (
        <div>
          <strong>{purchase.deliveryDetails.email}</strong>
          <div>{purchase.deliveryDetails.addressLine1}</div>
        </div>
      ),
    },
    {
      title: "Total Items",
      dataIndex: "totalCount",
      key: "totalCount",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, purchase: Purchase) => (
        <Select
          value={status}
          onChange={(value) => updatePurchaseStatus(purchase.id, value)}
          style={{ width: 140 }}
          options={productStatuses}
        />
      ),
    },
  ];

  return (
    <>
      {loadingPurchases ? (
        <div>Loading purchases...</div>
      ) : (
        <Card title="Purchases">
          <Table<Purchase>
            rowKey="id"
            columns={columns}
            dataSource={purchases}
            expandable={{
              expandedRowRender: (purchase) => (
                <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label="Products">
                    {purchase.products.map((product) => (
                      <div key={product.id}>
                        {product.qty} × {product.name}
                      </div>
                    ))}
                  </Descriptions.Item>
                </Descriptions>
              ),
            }}
          />
        </Card>
      )}
    </>
  );
}

export default PurchaseDashBoard
