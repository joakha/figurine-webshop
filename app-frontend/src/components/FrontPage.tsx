import ProductQueryInput from "./ProductQueryInput"
import type { NotificationInstance } from 'antd/es/notification/interface';

type Props = {
    notificationApi: NotificationInstance;
}

const FrontPage = ({ notificationApi }: Props) => {
    return (
        <div className='flex justify-center my-20'>
            <ProductQueryInput notificationApi={notificationApi} />
        </div>
    )
}

export default FrontPage