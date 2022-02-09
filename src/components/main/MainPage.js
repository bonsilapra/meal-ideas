import React, {useState, useMemo} from "react";
import { MyButton } from "../../commons/MyButtons";
import MealCard from "../meal/MealCard";
import Pagination from "../pagination/Pagination.js"
import "./MainPage.css"
import "../../commons/Commons.css"
import data from '../pagination/data/mock-data.json';


function MainPage() {

    let PageSize = 7;

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);


    return (
        <div className="main-container">
            <div className="log-in-container">
                <MyButton
                    buttonStyle='btn--primary'
                    buttonShape='btn--square'
                    buttonSize='btn--medium'
                >
                    ZALOGUJ
                </MyButton>
            </div>
            <div className="title-container">
                <h1>Co dziś jemy?</h1>
                <div className="search-container">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Szukaj"
                    >
                    </input>
                    <MyButton
                        buttonStyle='btn--primary'
                        buttonShape='btn--square'
                        buttonSize='btn--medium'
                    >
                        <i className="fas fa-search"></i>
                    </MyButton>
                    <MyButton
                        buttonStyle='btn--primary'
                        buttonShape='btn--square'
                        buttonSize='btn--medium'
                    >
                        <i className="fas fa-filter"></i>
                    </MyButton>
                </div>
            </div>
            <div className="cards-container">
                <MealCard 
                    key={1} 
                    mealCategory="obiad" 
                    mealName="Lazania" 
                    source="https://aniagotuje.pl/przepis/lazania" 
                    portions="6" 
                    meatType="wieprzowina" 
                    fillers="makaron" 
                    ingredients={["cebula", "czosnek", "przecier pomidorowy"]}
                />
                {currentTableData.map(item => {
                    return (
                        <MealCard key={item.id} mealName={item.first_name} />
                    )
                })}
            </div>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={data.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
        </div>
    )
}

export default MainPage