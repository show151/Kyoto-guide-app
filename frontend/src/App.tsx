
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Screen as SearchScreen } from "./search";
import { Screen as ResultScreen } from "./result";
import { Screen as DetailScreen } from "./detail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchScreen />} />
                <Route path="/result" element={<ResultScreen />} />
                <Route path="/detail/:id" element={<DetailScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
