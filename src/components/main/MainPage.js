import React, {useState, useMemo, useEffect, useContext} from "react";
import { MyButton } from "../../commons/MyButtons";
import MealCard from "../meal/MealCard";
import MealCardMultiMeat from "../meal/MealCardMultiMeat";
import MeatTypeButton from "./MeatTypeButton";
import Pagination from "../pagination/Pagination.js"
import "./MainPage.css"
import "../../commons/Commons.css"
import myAxios from '../../commons/MyAxios';
import Logout from '../login/Logout';
import AddMeal from '../adding/AddMeal';
import AddFiller from '../adding/AddFiller';
import AddIngredient from '../adding/AddIngredient';
import EditIngrOrFill from "../adding/EditIngrOrFill";




// import data from '../pagination/data/mock-data.json';


function MainPage() {


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

    const [recipes, setRecipes]=useState([]);
    const [mealFillers, setFillers]=useState([]);
    const [mealIngredients, setIngredients]=useState([]);
    const [isError, setError]=useState(false);

    const addRecipe = (recipe) => {
        setRecipes([...recipes, recipe])
    }

    const addIngredient = (ingr) => {
        setIngredients([...mealIngredients, ingr])
    }

    const removeIngredient = (ingr) => {
        setIngredients(mealIngredients.filter(element => {
            return element !== ingr
        }))
    }

    const editIngredient = (ingrOld, ingrNew) => {
        setIngredients([...mealIngredients.filter(element => {
            return element !== ingrOld
        }), ingrNew])
    }

    const addFiller = (filler) => {
        setFillers([...mealFillers, filler])
    }

    const removeFiller = (filler) => {
        setFillers(mealFillers.filter(element => {
            return element !== filler
        }))
    }

    useEffect(()=> {
        myAxios.get(`recipe`)
            .then(res => {
                const recipes = res.data;
                setRecipes(recipes);
                }
            )
            .catch(error => {
                setError(true);
                }
            )
        myAxios.get(`filler`)
            .then(res => {
                const mealFillers = res.data;
                setFillers(mealFillers);
                }
            )
            .catch(error => {
                setError(true);
                }
            )
        myAxios.get(`ingredient`)
            .then(res => {
                const mealIngredients = res.data;
                setIngredients(mealIngredients);
                }
            )
            .catch(error => {
                setError(true);
                }
            )
    },[]);

    let PageSize = 18;

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return recipes.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);


    const portionsValues = 
        recipes && recipes
        .reduce((accumulator, curr) => {
            if (accumulator.findIndex(elem => elem.value == curr.yield) < 0) {
                return accumulator.concat({value: curr.yield, text: curr.yield})
            } else {
                return accumulator
            }
        }, [])
    
    const portions = [{value: "",  text: "Porcje"}].concat(portionsValues)

    const fillersValues = 
        mealFillers && mealFillers.map((filler) => {
            return {value: filler, text: filler.charAt(0).toUpperCase() + filler.slice(1)}
        })

    const fillers = [{value: "",  text: "Dodatki"}].concat(fillersValues)

    const ingredientsValues = 
        mealIngredients && mealIngredients.map((ingr) => {
            return {value: ingr, text: ingr.charAt(0).toUpperCase() + ingr.slice(1)}
        })

    const ingredients = [{value: "",  text: "Składniki"}].concat(ingredientsValues)


    const mealCategoryHandler = (e) => {
            if (e.target.value != "obiad") {
                setFilterMeal({...filterMeal, mealCategory: e.target.value,  meatType: []})
            } else {
                setFilterMeal({...filterMeal, mealCategory: e.target.value})
            }
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

    const isLogged = sessionStorage.getItem('isLogged')

    return (
        <div className="main-container">
            {isLogged ?
                <div className="log-in-container">
                    <Logout />
                </div>:
                ""
            }
            <div className="title-container">
                <h1>Co dziś jemy?</h1>
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Szukaj"
                        name="Szukaj posiłku"
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
                {isLogged ?
                    <div className="add-meal-container">
                        <AddMeal mealCategories={mealCategories} meatTypes={meatTypes} fillers={fillers} ingredients={ingredients} addRecipe={addRecipe}/>
                        <AddFiller  addFiller={addFiller} removeFiller={removeFiller} mealFillers={mealFillers}/>
                        <AddIngredient addIngredient={addIngredient} removeIngredient={removeIngredient} mealIngredients={mealIngredients} />
                        <EditIngrOrFill mealFillers={mealFillers} mealIngredients={mealIngredients} editIngredient={editIngredient} />
                    </div>:
                    ""
                }
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
                                    aria-label='Kategoria posiłku'
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
                                    aria-label='Kategoria dodatku'
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
                                    aria-label='Ilość porcji'
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
                                    aria-label='Składniki'
                                >
                                    <i className="fas fa-carrot"></i>&nbsp;{ingrButton}&nbsp;<i className="fas fa-times"></i>
                                </MyButton>
                            )}
                        </div>
                    </>: ""
                }
            </div>
            {isError==true ?
                <div className="cards-container">
                    <h1>Backend nie działa!</h1>
                </div>
                :
                <div className="cards-container">
                    {recipes
                        .filter((val) => {
                            if (searchMeal == "") {
                                return val
                            } else if (val.name.toLowerCase().includes(searchMeal.toLowerCase())) {
                                return val
                            }
                        })
                        .filter((meal) => {
                            if (!filterMeal.mealCategory || filterMeal.mealCategory == "") {
                                return true
                            } 
                            else if (filterMeal.mealCategory == meal.category) {
                                return true
                            }
                        })
                        .filter((meal) => {
                            if (!filterMeal.meatType || filterMeal.meatType.length == 0) {
                                return true
                            } 
                            else  {
                                return filterMeal.meatType.every(meat => meal.meats.includes(meat))
                            }
                        })
                        .filter((meal) => {
                            if (!filterMeal.portions || filterMeal.portions == "") {
                                return true
                            } 
                            else if (filterMeal.portions == meal.yield) {
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
                                (meal.meats && meal.meats.length < 2) ?
                                    <MealCard 
                                        key={meal.id} 
                                        mealCategory={meal.category} 
                                        mealName={meal.name}  
                                        source={meal.source} 
                                        portions={meal.yield} 
                                        meatType={meal.meats[0]}  
                                        fillers={meal.fillers}  
                                        ingredients={meal.ingredients}
                                        isLogged={isLogged} 
                                    />:
                                    <MealCardMultiMeat 
                                        key={meal.id} 
                                        mealCategory={meal.category} 
                                        mealName={meal.name}  
                                        source={meal.source} 
                                        portions={meal.yield} 
                                        meatType={meal.meats}  
                                        fillers={meal.fillers}  
                                        ingredients={meal.ingredients} 
                                        isLogged={isLogged} 
                                    />
                            )
                        })
                    }
                </div>
            }
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={recipes.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
        </div>
    )
}

export default MainPage