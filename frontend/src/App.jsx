import { useState } from "react";
import "sweetalert2/src/sweetalert2.scss";
import NavMenu from "./components/NavMenu";

import Feedstock from "./pages/Feedstock";
import Product from "./pages/Product";
import ProductFeedstock from "./pages/ProductFeedstock";

const App = () => {
    const [menuActive, setMenuActive] = useState(1);

    return (
        <>
            <NavMenu onChangeMenu={(id) => setMenuActive(id)} />
            {menuActive === 1 && <ProductFeedstock />}
            {menuActive === 2 && <Product />}
            {menuActive === 3 && <Feedstock />}
        </>
    );
};

export default App;
