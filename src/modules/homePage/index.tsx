import SideBar from "../shared/sideBar";
import {Typography} from 'antd';

const {Title}=Typography

const HomePage = () => {
    return ( 
        <SideBar>
            <div>
                <Title level={1}>Home</Title>
            </div>
        </SideBar>
     );
}
 
export default HomePage;