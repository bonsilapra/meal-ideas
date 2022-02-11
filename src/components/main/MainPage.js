import React, {useState, useMemo} from "react";
import { MyButton } from "../../commons/MyButtons";
import MealCard from "../meal/MealCard";
import MealCardMultiMeat from "../meal/MealCardMultiMeat";
import MeatTypeButton from "./MeatTypeButton";
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
    const [filterMeal, setFilterMeal] = useState(
        {
            mealCategory: "",
            meatType: [],
            portions: "",
            fillers: [],
            ingredients: []
        }
    )
    const mealCategories = [
        {value: "", class: "", text: "Kategoria"},
        {value: "obiad", class: "option-type option-dinner", text: "Obiad"},
        {value: "śniadanie", class: "option-type option-breakfast", text: "Śniadanie"},
        {value: "kolacja", class: "option-type option-supper", text: "Kolacja"},
        {value: "deser", class: "option-type option-dessert", text: "Deser"},
        {value: "zupa", class: "option-type option-soup", text: "Zupa"},
    ]

    const meatTypes = [
        {value: "", class: "", text: "Mięso"},
        {value: "wołowina", class: "option-type option-dinner", text: "Wołowina"},
        {value: "kurczak", class: "option-type option-breakfast", text: "Kurczak"},
        {value: "wieprzowina", class: "option-type option-supper", text: "Wieprzowina"},
        {value: "ryba", class: "option-type option-dessert", text: "Ryba"},
        {value: "vege", class: "option-type option-soup", text: "Bez mięsa"},
    ]

////// przerobić na pobieranie axiosem /////////////
    const portions = [
        {value: "",  text: "Porcje"},
        {value: "4", text: "4"},
        {value: "2", text: "2"},
        {value: "1", text: "1"},
        {value: "16", text: "16"},
        {value: "5", text: "5"},
    ]

    const fillers = [
        {value: "",  text: "Dodatki"},
        {value: "ziemniaki", text: "Ziemniaki"},
        {value: "ryż", text: "Ryż"},
        {value: "kasza", text: "Kasza"},
        {value: "makaron", text: "Marakron"},
        {value: "chleb", text: "Chleb"},
    ]

    const ingredients = [
        {value: "",  text: "Składniki"},
        {value: "cebula", text: "Cebula"},
        {value: "czosnek", text: "Czosnek"},
        {value: "przecier pomidorowy", text: "Przecier pomidorowy"},
        {value: "limonka", text: "Limonka"},
        {value: "mąka", text: "Mąka"},
    ]
//////////////////////////////////////////////////////

    const mealCategoryHandler = (e) => {
        setFilterMeal({...filterMeal, mealCategory: e.target.value})
    }

    const removeMealCategory = () => {
        setFilterMeal({...filterMeal, mealCategory: "",  meatType: []})
    }

    const meatTypeHandler = (e) => {
        setFilterMeal({...filterMeal, meatType: [...filterMeal.meatType, e.target.value]})
    }

    const removeMeatType = (meatName) => {
        setFilterMeal({...filterMeal, meatType: filterMeal.meatType.filter((e) => e != meatName )})
    }

    const portionsHandler = (e) => {
        setFilterMeal({...filterMeal, portions: e.target.value})
    }

    const removePortions = () => {
        setFilterMeal({...filterMeal, portions: ""})
    }

    const fillerTypeHandler = (e) => {
        setFilterMeal({...filterMeal, fillers: [...filterMeal.fillers, e.target.value]})
    }

    const removeFillerType = (fillerName) => {
        setFilterMeal({...filterMeal, fillers: filterMeal.fillers.filter((e) => e != fillerName )})
    }

    const ingredientTypeHandler = (e) => {
        setFilterMeal({...filterMeal, ingredients: [...filterMeal.ingredients, e.target.value]})
    }

    const removeIngredients = (ingrName) => {
        setFilterMeal({...filterMeal, ingredients: filterMeal.ingredients.filter((e) => e != ingrName )})
    }

    const clearFilters = () => {
        setFilterMeal(
            {
                mealCategory: "",
                meatType: [],
                portions: "",
                fillers: [],
                ingredients: []
            }
        )
    }


    let mockDishes = [
        {
            key:1,
            mealCategory:"obiad", 
            mealName:"Lazania", 
            source:"https://aniagotuje.pl/przepis/lazania",
            portions:"6",
            meatType:["wieprzowina", "wołowina", "kurczak", "ryba"] ,
            fillers:["makaron"] ,
            ingredients:["cebula", "czosnek", "przecier pomidorowy"]
        },
        {
            key:4,
            mealCategory:"obiad", 
            mealName:"Lazania duża", 
            source:"https://aniagotuje.pl/przepis/lazania",
            portions:"8",
            meatType:["wieprzowina"] ,
            fillers:["makaron"] ,
            ingredients:["cebula", "czosnek", "przecier pomidorowy"]
        },
        {
            key:2,
            mealCategory:"deser", 
            mealName:"Kruche rogaliki z marmoladą/powidłami", 
            source:"Przepiśnik",
            portions:"32/40",
            meatType:[""] ,
            fillers:[] ,
            ingredients:["mąka pszenna", "margaryna", "cukier puder", "żółtka", "śmietana 18%" ]
        },
        {
            key:3,
            mealCategory:"obiad", 
            mealName:"Tatar", 
            source:"Z głowy",
            portions:"2",
            meatType:["wołowina"] ,
            fillers:["chleb"] ,
            ingredients:["cebula", "ogórek kiszony", "żółtka"]
        },
        {
            key:5,
            mealCategory:"obiad", 
            mealName:"Łosoś w sojowo-imbirowej marynacie", 
            source:"https://kuchnialidla.pl/losos-w-sojowo-imbirowej-marynacie",
            portions:"4",
            meatType:["ryba"] ,
            fillers:["ryż"] ,
            ingredients:["łosoś", "imbir", "czosnek", "limonka", "sos sojowy"]
        },
        {
            key:6,
            mealCategory:"obiad", 
            mealName:"Naleśniki", 
            source:"Przepiśnik",
            portions:"4",
            meatType:["vege"] ,
            fillers:[] ,
            ingredients:["mąka pszenna", "jajko", "mleko"]
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
                        title='Filtr'
                    >
                        {filterActive ?
                            <i className="fas fa-times"></i> :
                            <i className="fas fa-filter"></i>
                        }
                    </MyButton>
                </div>
                {filterActive ?
                    <>
                        <div className="filter-container">
                            <div>
                                <select value="" onChange={mealCategoryHandler}> 
                                    {mealCategories && mealCategories.map((mealCat) => {
                                        return <option key={mealCat.value} value={mealCat.value} className={mealCat.class}>{mealCat.text}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                {filterMeal.mealCategory=="obiad" ?
                                    <select value="" onChange={meatTypeHandler}>
                                        {meatTypes && meatTypes.map((meatType) => 
                                            <option 
                                                key={meatType.value} 
                                                value={meatType.value} 
                                                className={meatType.class} 
                                                disabled={filterMeal.meatType.includes(meatType.value)}
                                            >
                                                {meatType.text}
                                            </option>
                                        )}
                                    </select> : ""
                                }
                            </div>
                            <div>
                                <select value="" onChange={portionsHandler}> 
                                    {portions && portions
                                    .sort((a, b) => a.value.localeCompare(b.value))
                                    .map((portion) => {
                                        return <option key={portion.value} value={portion.value}>{portion.text}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <select value="" onChange={fillerTypeHandler}>
                                    {fillers && fillers
                                    .sort((a, b) => a.value.localeCompare(b.value))
                                    .map((fillerType) => 
                                        <option 
                                            key={fillerType.value} 
                                            value={fillerType.value} 
                                            disabled={filterMeal.fillers.includes(fillerType.value)}
                                        >
                                            {fillerType.text}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <select value="" onChange={ingredientTypeHandler}>
                                    {ingredients && ingredients
                                    .sort((a, b) => a.value.localeCompare(b.value))
                                    .map((ingrType) => 
                                        <option 
                                            key={ingrType.value} 
                                            value={ingrType.value} 
                                            disabled={filterMeal.ingredients.includes(ingrType.value)}
                                        >
                                            {ingrType.text}
                                        </option>
                                    )}
                                </select>
                                <MyButton
                                    buttonStyle='btn--primary'
                                    buttonShape='btn--square'
                                    buttonSize='btn--medium-smaller'
                                    onClick={() => clearFilters()}
                                    title='Wyczyść filtry'
                                >
                                    <i className="fas fa-ban"></i>
                                </MyButton>
                            </div>
                        </div>
                        <div className="filter-container">
                            {filterMeal.mealCategory.length !=0 ?
                                <MyButton
                                    buttonStyle='btn--primary'
                                    buttonShape='btn--square'
                                    buttonSize='btn--small'
                                    onClick={()=>removeMealCategory()}
                                >
                                    <i className="fas fa-utensils"></i>&nbsp;{filterMeal.mealCategory}&nbsp;<i className="fas fa-times"></i>
                                </MyButton>
                                :""
                            }
                            {filterMeal.meatType.map((meatButton) => {  
                                return <MeatTypeButton key={meatButton} meatType={meatButton} removeMeatType={removeMeatType}/>
                            })
                            }
                            {filterMeal.fillers.map((fillerButton) => 
                                <MyButton
                                    key={fillerButton}
                                    buttonStyle='btn--primary'
                                    buttonShape='btn--square'
                                    buttonSize='btn--small'
                                    onClick={()=>removeFillerType(fillerButton)}
                                >
                                    <i className="fas fa-bread-slice"></i>&nbsp;{fillerButton}&nbsp;<i className="fas fa-times"></i>
                                </MyButton>
                            )}
                            {filterMeal.portions.length !=0 ?
                                <MyButton
                                    buttonStyle='btn--primary'
                                    buttonShape='btn--square'
                                    buttonSize='btn--small'
                                    onClick={()=>removePortions()}
                                >
                                    <i className="fas fa-pizza-slice"></i>&nbsp;{filterMeal.portions}&nbsp;<i className="fas fa-times"></i>
                                </MyButton>
                                :""
                            }
                            {filterMeal.ingredients.map((ingrButton) => 
                                <MyButton
                                    key={ingrButton}
                                    buttonStyle='btn--primary'
                                    buttonShape='btn--square'
                                    buttonSize='btn--small'
                                    onClick={()=>removeIngredients(ingrButton)}
                                >
                                    <i className="fas fa-carrot"></i>&nbsp;{ingrButton}&nbsp;<i className="fas fa-times"></i>
                                </MyButton>
                            )}
                        </div>
                    </>: ""
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
                        if (!filterMeal.meatType || filterMeal.meatType.length == 0) {
                            return true
                        } 
                        else  {
                            return filterMeal.meatType.every(meat => meal.meatType.includes(meat))
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
                        if (!filterMeal.fillers || filterMeal.fillers.length == 0) {
                            return true
                        } 
                        else { 
                            return filterMeal.fillers.every(fill => meal.fillers.includes(fill))
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
                            (meal.meatType && meal.meatType.length == 1) ?
                                <MealCard 
                                    key={meal.key} 
                                    mealCategory={meal.mealCategory} 
                                    mealName={meal.mealName}  
                                    source={meal.source} 
                                    portions={meal.portions} 
                                    meatType={meal.meatType[0]}  
                                    fillers={meal.fillers}  
                                    ingredients={meal.ingredients} 
                                />:
                                <MealCardMultiMeat 
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