import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/actions';
import RaisedButton from 'material-ui/RaisedButton';

class RecipesList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let recipesArray = this.props.recipes.recipes;

        const recipesList = recipesArray.length === 0
            ? "Loading..."
            : recipesArray.map((recipe, i) => {
                let title = recipe.recipe.label.charAt(0).toUpperCase() + recipe.recipe.label.toLowerCase().slice(1);
                let saveRecipeObj = {title: title, image: recipe.recipe.image, uri: recipe.recipe.uri, url: recipe.recipe.url};
                return (
                    <div className="recipe-container" key={i}>
                        <section className="recipe-box">
                            <h3 className="recipe-title">
                                {title}
                            </h3>
                            <img className="recipe-photo" src={recipe.recipe.image} alt="Photo" />
                            <RaisedButton label="View this Recipe" className="recipe-button" onClick={() => {
                            window.open(recipe.recipe.url);}} />                            <RaisedButton label="Save this Recipe" className="recipe-button" onClick={() => {
                            this.props.dispatch(actions.postRecipe(saveRecipeObj));}} />

                        </section>
                    </div>
                )
            })
        if(recipesArray.length >= 3) {
            return (
                <div className="recipes-container">
                    <div className="recipes-list">
                        {recipesList}
                    </div>
                    <hr />
                </div>
        )} else {
            return <div className="recipes-list"></div>
        }
    }
}

const mapStateToProps = (state, props) => ({recipes: state.recipes})

export default connect(mapStateToProps)(RecipesList);
