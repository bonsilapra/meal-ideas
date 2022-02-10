import React, {useState, useMemo, useEffect} from "react";
import { MyButton } from "../../commons/MyButtons";
import MealCard from "../meal/MealCard";
import Pagination from "../pagination/Pagination.js"
import "./MainPage.css"
import "../../commons/Commons.css"
import data from '../pagination/data/mock-data.json';


function MainPage() {

    // const [PageSize, setPageSize] = useState(8);

    // const handlePageSize = () => {
    //     if (window.innerWidth <= 795) {
    //         setPageSize(8);
    //     } 
    //     else if ( 795 < window.innerWidth <= 1165) {
    //         setPageSize(10);
    //     } 
    //     else if (1165 < window.innerWidth <= 1535) {
    //         setPageSize(12);
    //     } 
    //     else if (1535 < window.innerWidth) {
    //         setPageSize(14);
    //     } else {
    //         setPageSize(6);
    //     }
    // };
    // useEffect(() => {
    //     handlePageSize();
    // }, []);
    // window.addEventListener('resize', handlePageSize);

    let PageSize = 18;

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    const [searchMeal, setSearchMeal] = useState("")
    const [filterActive, setFilterActive] = useState(false)
    const [filterMeal, setFilterMeal] = useState({})

    const handleFilterMeal = (mealCategory, meatType, portions, fillers, ingredients ) => {
        setFilterMeal({
            mealCategory: mealCategory,
            meatType: meatType,
            portions: portions,
            fillers: fillers,
            ingredients: ingredients
        })
    }

    let mockDishes = [
        {
            key:1,
            mealCategory:"obiad", 
            mealName:"Lazania", 
            source:"https://aniagotuje.pl/przepis/lazania",
            portions:"6",
            meatType:"wieprzowina" ,
            fillers:"makaron" ,
            ingredients:["cebula", "czosnek", "przecier pomidorowy"]
        },
        {
            key:4,
            mealCategory:"obiad", 
            mealName:"Lazania duża", 
            source:"https://aniagotuje.pl/przepis/lazania",
            portions:"8",
            meatType:"wieprzowina" ,
            fillers:"makaron" ,
            ingredients:["cebula", "czosnek", "przecier pomidorowy"]
        },
        {
            key:2,
            mealCategory:"deser", 
            mealName:"Kruche rogaliki z marmoladą/powidłami", 
            source:"Przepiśnik",
            portions:"32/40",
            meatType:"" ,
            fillers:"" ,
            ingredients:["mąka pszenna", "margaryna", "cukier puder", "żółtka", "śmietana 18%" ]
        },
        {
            key:3,
            mealCategory:"obiad", 
            mealName:"Tatar", 
            source:"Z głowy",
            portions:"2",
            meatType:"wołowina" ,
            fillers:"chleb" ,
            ingredients:["cebula", "ogórek kiszony", "żółtka"]
        },
    ]

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
                        type="text" 
                        placeholder="Szukaj"
                        onChange={event => {setSearchMeal(event.target.value)}}
                    >
                    </input>
                    <MyButton
                        buttonStyle='btn--primary'
                        buttonShape='btn--square'
                        buttonSize='btn--medium'
                        onClick={() => setFilterActive(!filterActive)}
                    >
                        <i className="fas fa-filter"></i>
                    </MyButton>
                </div>
                {filterActive ?
                    <div className="filter-container">
                        <MyButton
                            buttonStyle='btn--primary'
                            buttonShape='btn--square'
                            buttonSize='btn--medium'
                            onClick={()=>handleFilterMeal()}
                        >
                            <i className="fas fa-search"></i>
                        </MyButton>
                    </div> : ""
                }
            </div>
            <div className="cards-container">
                {mockDishes
                    .filter((meal) => {
                        if (!filterMeal.mealCategory || filterMeal.mealCategory == "") {
                            return true
                        } 
                        else if (filterMeal.mealCategory == meal.mealCategory) {
                            return true
                        }
                    })
                    .filter((meal) => {
                        if (!filterMeal.meatType || filterMeal.meatType == "") {
                            return true
                        } 
                        else if (filterMeal.meatType == meal.meatType) {
                            return true
                        }
                    })
                    .filter((meal) => {
                        if (!filterMeal.portions || filterMeal.portions == "") {
                            return true
                        } 
                        else if (filterMeal.portions == meal.portions) {
                            return true
                        }
                    })
                    .filter((meal) => {
                        if (!filterMeal.fillers || filterMeal.fillers == "") {
                            return true
                        } 
                        else if (filterMeal.fillers == meal.fillers) {
                            return true
                        }
                    })
                    .filter((meal) => {
                        if (!filterMeal.ingredients || filterMeal.ingredients.length == 0) {
                            return true
                        } 
                        else { 
                            return filterMeal.ingredients.every(ingr => meal.ingredients.includes(ingr))
                        } 
                        
                    })
                    .map((meal) => {
                        return(
                            <MealCard 
                                key={meal.key} 
                                mealCategory={meal.mealCategory} 
                                mealName={meal.mealName}  
                                source={meal.source} 
                                portions={meal.portions} 
                                meatType={meal.meatType}  
                                fillers={meal.fillers}  
                                ingredients={meal.ingredients} 
                            />
                        )
                    })
                }
                {/* {currentTableData
                    .filter((val) => {
                        if (searchMeal == "") {
                            return val
                        } else if (val.first_name.toLowerCase().includes(searchMeal.toLowerCase())) {
                            return val
                        }
                    })
                    .map(item => {
                        return (
                            <MealCard key={item.id} mealName={item.first_name} />
                        )
                    })
                } */}
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